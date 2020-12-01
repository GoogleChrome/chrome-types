#!/usr/bin/env node

import {fetchAndCache} from './lib/fetch-cache.js';
import zlib from 'zlib';
import tar from 'tar-stream';
import {promises as fsPromises} from 'fs';
import path from 'path';
import stream from 'stream';
import childProcess from 'child_process';
import { tasks } from './lib/tasks.js';

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
 * Run the types generation process.
 *
 * @param {string} target temporary folder to use (will be removed before start)
 */
async function run(target) {
  await fsPromises.rmdir(target, {recursive: true});

  await Promise.all(allPaths.map((chromePath) => {
    return fetchAndPrepare(target, chromePath);
  }));

  // Create a sorted list of source JSON/IDL files that can be processed by
  // this tool.
  const definitions = [];
  for (const definitionPath of definitionPaths) {
    const p = path.join(target, definitionPath);
    const list = (await fsPromises.readdir(p)).filter((p) => {
      const invalidRe = /(_private|_internal|test)/;
      if (invalidRe.test(p) || p.startsWith('_')) {
        return false;
      }
      return p.endsWith('.json') || p.endsWith('.idl');
    });

    for (const filename of list) {
      definitions.push(path.join(definitionPath, filename));
    }
  }

  // Sort by filename, not by directory.
  definitions.sort((a, b) => path.basename(a).localeCompare(path.basename(b)));

  const extracted = await tasks(definitions, async (definition) => {
    // TODO(samthor): switch to tsdoc
    const args = ['tools/json_schema_compiler/compiler.py', '-g', 'interface', definition];

    return new Promise((resolve) => {
      const ls = childProcess.spawn('python', args, {
        cwd: target,
        shell: true,
      });
      const chunks = [];
      const errorChunks = [];

      ls.stdout.on('data', (data) => chunks.push(data));
      ls.stderr.on('data', (data) => errorChunks.push(data));

      ls.on('close', (code) => {
        const out = Buffer.concat(code ? errorChunks : chunks);
        return resolve({definition, code, out});
      });
    });
  });

  for (const {definition, code, out} of extracted) {
    if (code) {
      console.warn(`failed to convert ${definition}:`);
      console.warn(out.toString('utf-8'));
    } else {
      process.stdout.write(`\n// ${path.basename(definition)}\n`);
      process.stdout.write(out);
    }
  }
}

const {pathname: __filename} = new URL(import.meta.url);
const __dirname = path.dirname(__filename);

const preamble = await fsPromises.readFile(path.join(__dirname, 'preamble.d.ts'));
process.stdout.write(preamble);

await run(path.join(__dirname, '.work'));
