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


import { exec } from '../../lib/exec.js';
import * as path from 'path';


/**
 * @param {string} root
 * @param {string} filename
 * @return {Promise<Buffer>}
 */
export async function convertFromIdl(root, filename) {
  const commandPath = path.join(root, 'tools/json_schema_compiler/idl_schema.py');
  const args = ['python', commandPath, filename];
  const {code, out} = await exec(args);
  if (code) {
    const basename = path.basename(filename);
    throw new Error(`could not convert ${basename}: ${code}`);
  }
  return out;
}
