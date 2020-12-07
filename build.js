#!/usr/bin/env node
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import {fetchAndCache} from './lib/fetch-cache.js';
import zlib from 'zlib';
import tar from 'tar-stream';
import {promises as fsPromises} from 'fs';
import path from 'path';
import stream from 'stream';
import childProcess from 'child_process';
import {tasks} from './lib/tasks.js';
import {extractNamespaceName} from './lib/typedoc-helper.js';
import fg from 'fast-glob';
import {extractConfig, loadFeatures} from './lib/features.js';

const definitionPaths = [
  'extensions/common/api',
  'chrome/common/extensions/api',
];

const allPaths = [
  // Tooling required to parse JSON/IDL
  'tools/json_schema_compiler',
  'tools/json_comment_eater',
  'ppapi/generators',
  'third_party/ply',

  // JSON/IDL themselves
  ...definitionPaths,
];

const patchesToApply = [
  // This is the patch out to create TSDoc types.
  'https://chromium-review.googlesource.com/changes/chromium%2Fsrc~2544287/revisions/7/patch?download',
];

/**
 * Fetch the specified part of the Chromium source tree into the target work path.
 *
 * @param {string} targetPath target work folder to extract to
 * @param {string} chromePath chrome subtree path
 * @return {!Promise<void>}
 */
async function fetchAndPrepare(targetPath, chromePath) {
  const extractPath = path.join(targetPath, chromePath);
  await fsPromises.mkdir(extractPath, {recursive: true});

  const url = `https://chromium.googlesource.com/chromium/src/+archive/master/${chromePath}.tar.gz`;
  const gzipBytes = await fetchAndCache(url);

  const bytes = await new Promise((resolve, reject) => {
    zlib.gunzip(gzipBytes, (err, result) => err ? reject(err) : resolve(result));
  });

  const writes = [];

  /**
   * @param {string} name
   * @param {Buffer} buffer
   */
  const writeFile = (name, buffer) => {
    const task = async () => {
      const writePath = path.join(extractPath, name);
      await fsPromises.mkdir(path.dirname(writePath), {recursive: true});
      await fsPromises.writeFile(writePath, buffer);
    };
    writes.push(task());
  }

  await new Promise((resolve, reject) => {
    const extract = tar.extract();

    extract.on('entry', (header, stream, next) => {
      const chunks = [];

      stream.on('error', reject);
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => {
        if (!header.name.endsWith('/')) {
          writeFile(header.name, Buffer.concat(chunks));
        }
        next();
      });
      stream.resume();
    });

    extract.on('error', reject);
    extract.on('finish', () => resolve());

    const readable = new stream.Readable();
    readable.push(bytes);
    readable.push(null);
    readable.pipe(extract);
  });

  await Promise.all(writes);
}

/**
 * @param {string[]} args
 * @param {string} cwd
 * @param {string|undefined} stdin
 * @return {!Promise<{code: number, out: Buffer}>}
 */
function exec(args, cwd, stdin=undefined) {
  const command = args.shift();
  return new Promise((resolve) => {
    const ls = childProcess.spawn(command, args, {
      cwd,
      shell: true,
    });
    const chunks = [];
    const errorChunks = [];

    if (stdin !== undefined) {
      ls.stdin.write(stdin);
      ls.stdin.end();
    }

    ls.stdout.on('data', (data) => chunks.push(data));
    ls.stderr.on('data', (data) => errorChunks.push(data));

    ls.on('close', (code) => {
      const out = Buffer.concat(code ? errorChunks : chunks);
      return resolve({code, out});
    });
  });
}

/**
 * Run the types generation process.
 *
 * @param {string} target temporary folder to use (will be removed before start)
 */
async function run(target) {
  await fsPromises.rmdir(target, {recursive: true});

  allPaths.sort();
  await Promise.all(allPaths.map((chromePath, i) => {
    const previousPaths = allPaths.slice(0, i);
    for (const previous of previousPaths) {
      if (chromePath.startsWith(previous + '/')) {
        return; // skip, we have this one
      }
    }
    return fetchAndPrepare(target, chromePath);
  }));

  // Apply patches.
  for (const patchUrl of patchesToApply) {
    const base64PatchBytes = await fetchAndCache(patchUrl);
    const output = Buffer.from(base64PatchBytes.toString('utf-8'), 'base64').toString('utf-8');

    const args = ['patch', '-s', '-p1'];
    await exec(args, target, output);
  }

  // Find all features files and combine them.
  const features = await loadFeatures(definitionPaths.map((p) => path.join(target, p)));

  // Create a sorted list of source JSON/IDL files that can be processed by
  // this tool.
  const definitions = [];
  for (const definitionPath of definitionPaths) {
    const p = path.join(target, definitionPath);

    // We need to glob subfolders as "devtools" contains inner JSON files.
    const list = fg.sync('**/*.{json,idl}', {cwd: p}).filter((p) => {
      return !p.startsWith('_') && (p.endsWith('.json') || p.endsWith('.idl'));
    });

    for (const filename of list) {
      definitions.push({definitionPath, filename});
    }
  }

  // Sort by filename, not by directory.
  definitions.sort(({filename: a}, {filename: b}) => a.localeCompare(b));

  // Perform compilation in parallel.
  // Testing on an iMac Pro brings this from 13s => 3s.
  const extracted = await tasks(definitions, async ({definitionPath, filename}) => {
    const p = path.join(definitionPath, filename);

    const args = ['python', 'tools/json_schema_compiler/compiler.py', '-g', 'tsdoc', p];
    const {code, out} = await exec(args, target);
    if (code) {
      throw new Error(`could not convert: ${p}`);
    }
    const s = out.toString('utf-8');

    const namespaceName = extractNamespaceName(s);
    const id = namespaceName.replace(/^chrome\./, '');

    const config = extractConfig(id, features);
    if (config === null) {
      console.warn('Skipping', namespaceName, '...');
      return '';  // do nothing with this API
    }

    const {extensionTypes: et} = config;

    // FIXME(samthor): 'usb' is not marked as an extension API but is in fact used by
    // 'printerProviders' purely as a type.
    const isAlwaysExtensionApi = (id === 'usb');

    // nb. Most Apps APIs are marked correctly; 'chrome.tabs' is only marked legacy_packaged_app.
    const isAppApi = et.size === 0 || et.has('platform_app') || et.has('legacy_packaged_app');
    const isExtensionApi = et.size === 0 || et.has('extension') || isAlwaysExtensionApi;

    const prefixLines = [];

    if (config.channel === 'beta') {
      prefixLines.push('@beta');
    } else if (config.channel === 'dev') {
      prefixLines.push('@alpha');
    }
    config.platforms.forEach((platform) => {
      prefixLines.push(`@chrome-platform ${platform}`);
    });
    config.permissions.forEach((permission) => {
      prefixLines.push(`@chrome-permission ${permission}`);
    });

    const generated = s.replace(' */', prefixLines.map((line) => ` * ${line}\n`).join('') + ' */');
    return {generated, isAppApi, isExtensionApi};
  });

  // We generate two output files: one contains APIs supported by platform apps, and one contains
  // APIs supported by extensions.

  const apps = [];
  const extensions = [];
  for (const {generated, isAppApi, isExtensionApi} of extracted) {
    if (isAppApi) {
      apps.push(generated);
    }
    if (isExtensionApi) {
      extensions.push(generated);
    }
  }
  return {apps, extensions};
}

const generatedString = `// Generated on ${new Date()}\n\n`;

const {pathname: __filename} = new URL(import.meta.url);
const __dirname = path.dirname(__filename);

const preamble = await fsPromises.readFile(path.join(__dirname, 'preamble.d.ts'));
const {apps, extensions} = await run(path.join(__dirname, '.work'));

const outputDir = path.join(__dirname, 'npm');

await fsPromises.writeFile(path.join(outputDir, 'index.d.ts'),
    preamble + generatedString + extensions.join('\n'));

await fsPromises.writeFile(path.join(outputDir, 'platform_app.d.ts'),
    preamble + generatedString + apps.join('\n'));
