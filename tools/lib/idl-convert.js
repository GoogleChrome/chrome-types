/**
 * Copyright 2021 Google LLC
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


import { promisify } from 'util';
import * as childProcess from 'child_process';
import JSON5 from 'json5';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { readFromCache, writeToCache } from './cache-helper.js';


const execFile = promisify(childProcess.execFile);
const commandPath = 'tools/json_schema_compiler/idl_schema.py';
const commandPathWebIdl = 'tools/json_schema_compiler/web_idl_schema.py';


const idlCacheDays = 12;
const idlCacheExpiry = idlCacheDays * 24 * 60 * 60 * 1000;


/**
 * @param {string} root
 * @param {string} filename
 * @return {Promise<{cache: boolean, o: Object}>}
 */
export async function convertFromIdl(root, filename) {
  const args = filename.endsWith('webidl') ? [commandPathWebIdl, filename] : [commandPath, filename];

  // Find the MD5 of the input IDL to match it in cache.
  const p = path.join(root, filename);
  const bytes = fs.readFileSync(p);
  const md5 = crypto.createHash('md5').update(bytes).digest('hex');
  const cacheKey = `idl-convert-${md5}.json`;

  // This has a huge (week+) long expiry date for the same bytes. This allows the parser/generator
  // to change over time if needed.
  // Most IDL files don't change per-release so this saves us CPU time.
  const existingConvert = readFromCache(cacheKey, idlCacheExpiry);
  if (existingConvert) {
    try {
      const o = JSON5.parse(existingConvert.toString('utf-8'));
      return {o, cache: true};
    } catch {
      // ignore
    }
  }

  // Try a few Python instances in case there's some problem. Prefer python3 if possible.
  const pythonBinary = ['python3', 'python', 'python2.7'];

  for (const binary of pythonBinary) {
    try {
      const { stdout } = await execFile(binary, args, { cwd: root });

      // Ensure that we don't have any invalid JSON here by converting back to an object.
      const o = JSON5.parse(stdout);

      writeToCache(cacheKey, stdout);

      return {o, cache: false};
    } catch (e) {
      if (!(e instanceof Error)) {
        e = new Error(`unable to run ${binary}: ${e}`);
      }
      const err = /** @type {Error} */ (e);

      // @ts-ignore
      if (err.code === 'ENOENT') {
        // This is probably a missing/bad Python install.
        continue;
      }

      throw err;
    }
  }

  throw new Error(`could not run Python to convert: ${filename}`);
}
