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


const execFile = promisify(childProcess.execFile);
const commandPath = 'tools/json_schema_compiler/idl_schema.py';


/**
 * @param {string} root
 * @param {string} filename
 * @return {Promise<Object>}
 */
export async function convertFromIdl(root, filename) {
  const args = [commandPath, filename];

  // Try a few Python instances in case there's some problem. Prefer python3 if possible.
  const pythonBinary = ['python3', 'python', 'python2.7'];

  for (const binary of pythonBinary) {
    try {
      const { stdout } = await execFile(binary, args, { cwd: root });

      // Ensure that we don't have any invalid JSON here by converting back to an object.
      const o = JSON5.parse(stdout);

      return o;
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
