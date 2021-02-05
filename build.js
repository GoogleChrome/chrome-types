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


import {fetchAllTo} from './src/chrome-work.js';
import {cache, networkFetcher} from './lib/cache.js';
import {promises as fsPromises} from 'fs';
import * as path from 'path';
import * as childProcess from 'child_process';
import {tasks} from './lib/tasks.js';
import {extractNamespaceName, insertTagsAtNamespace} from './lib/typedoc-helper.js';
import {extractConfig, loadFeatures} from './lib/features.js';
import mri from 'mri';
import {chromeVersions} from './src/versions.js';
import log from 'fancy-log';
import * as color from 'colorette';

// @ts-ignore
import fg from 'fast-glob';


const debug = false;

const EARLY_CHROME = 35;


const {pathname: __filename} = new URL(import.meta.url);
const __dirname = path.dirname(__filename);


const definitionPaths = [
  'extensions/common/api',
  'chrome/common/extensions/api',
  'chrome/common/apps/platform_apps/api',
];

const toolsPaths = [
  'tools/json_schema_compiler',
  'tools/json_comment_eater',
  'ppapi/generators',
  'third_party/ply',
];

const patchesToApply = [
  // This is the patch out to create TSDoc types.
  'https://chromium-review.googlesource.com/changes/chromium%2Fsrc~2544287/revisions/16/patch?download',
];

/**
 * @param {string[]} args
 * @param {string} cwd
 * @param {string|undefined} stdin
 * @return {!Promise<{code: number, out: Buffer}>}
 */
function exec(args, cwd, stdin=undefined) {
  const command = args.shift();
  if (!command) {
    throw new TypeError(`no command specified`)
  }
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
      return resolve({code: code ?? 0, out});
    });
  });
}

/**
 * Run the types generation process.
 *
 * @param {string} target temporary folder to use (will be removed before start)
 * @param {string} revision to fetch APIs at
 */
async function run(target, revision) {
  await fsPromises.rmdir(target, {recursive: true});

  await fetchAllTo(target, toolsPaths);
  await fetchAllTo(target, definitionPaths, revision);

  // Apply patches to tools.
  for (const patchUrl of patchesToApply) {
    const buffer = await cache(patchUrl, networkFetcher(patchUrl, (buffer) => {
      return Buffer.from(buffer.toString('utf-8'), 'base64');
    }));
    const output = buffer.toString('utf-8');

    const args = ['patch', '-s', '-p1'];
    await exec(args, target, output);
    log(`Patched with ${color.green(patchUrl)}`);
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

  if (debug) {
    const render = '  ' + definitions.map(({filename}) => filename).join('\n  ') + '\n';
    console.warn(definitions.length, 'raw APIs files:');
    console.info(render);
  }

  // Perform compilation in parallel.
  // Testing on an iMac Pro brings this from 13s => 3s.
  const extracted = await tasks(definitions, async ({definitionPath, filename}) => {
    const rel = path.join(definitionPath, filename);
    const p = path.join(target, rel);

    const args = ['python', 'tools/json_schema_compiler/compiler.py', '-g', 'tsdoc', p];
    const {code, out} = await exec(args, target);
    const s = out.toString('utf-8');
    if (code || s.trim().length === 0) {
      console.warn(out);
      log(`Could not convert "${color.green(rel)}" ${code}`);
      return {};
    }

    log(`Opening "${color.green(rel)}"...`);
    const namespaceName = extractNamespaceName(s);
    const id = namespaceName.replace(/^chrome\./, '');

    const config = extractConfig(id, features);
    if (config === null) {
      log('Skipping', color.green(namespaceName), '...');
      return {};  // do nothing with this API
    }

    const {extensionTypes: et} = config;

    // FIXME(samthor): 'usb' is not marked as an extension API but is in fact used by
    // 'printerProviders' purely as a type.
    const isAlwaysExtensionApi = (id === 'usb');

    // nb. Most Apps APIs are marked correctly; 'chrome.tabs' is only marked legacy_packaged_app.
    const isAppApi = et.size === 0 || et.has('platform_app') || et.has('legacy_packaged_app');
    const isExtensionApi = et.size === 0 || et.has('extension') || isAlwaysExtensionApi;

    const tags = [];
    if (config.channel === 'beta') {
      tags.push('@beta');
    } else if (config.channel === 'dev') {
      tags.push('@alpha');
    }
    config.platforms.forEach((platform) => {
      tags.push(`@chrome-platform ${platform}`);
    });
    config.permissions.forEach((permission) => {
      tags.push(`@chrome-permission ${permission}`);
    });

    const generated = insertTagsAtNamespace(s, tags);
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


async function start({version = 0} = {}) {
  let revision = 'master';
  let outputDir = path.join(__dirname, 'npm');

  if (version !== 0) {
    const allVersions = await chromeVersions();
    const data = allVersions.get(version);
    if (data === undefined) {
      throw new Error(`could not find Chrome ${version}`);
    }
    ({hash: revision} = data);
    log(`Fetching for Chrome ${color.red('' + version)}, revision ${color.red(revision)}...`);

    outputDir = path.join(outputDir, `version/${version}`);
  }

  const generatedString = `// Generated on ${new Date()}\n\n`;

  const preamble = await fsPromises.readFile(path.join(__dirname, 'preamble.d.ts'));
  const {apps, extensions} = await run(path.join(__dirname, '.work'), revision);

  log(`Generated ${color.blue('' + extensions.length)} extensions APIs`);
  log(`Generated ${color.blue('' + apps.length)} apps APIs`);

  await fsPromises.mkdir(outputDir, {recursive: true});

  await fsPromises.writeFile(path.join(outputDir, 'index.d.ts'),
      preamble + generatedString + extensions.join('\n'));

  await fsPromises.writeFile(path.join(outputDir, 'platform_app.d.ts'),
      preamble + generatedString + apps.join('\n'));
}

// Options:
//   --version xx      to fetch a specific version, rather than master
//   --all             to try all versions below the specified version
const args = mri(process.argv.slice(2), {
  boolean: ['all'],
});
let version = Math.floor(+args.version || 0);

if (args.all) {
  while (version >= EARLY_CHROME) {
    await start({version});
    --version;
  }
} else {
  await start({version: 0});
}
