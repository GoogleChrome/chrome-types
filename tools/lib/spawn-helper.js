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


import * as childProcess from 'child_process';
import * as path from 'path';


/**
 * The root directory of the types project.
 */
export const { pathname: rootDir } = new URL('../../', import.meta.url);


/**
 * @param {string[]} parts
 * @param {{cwd?: string, input?: Buffer, stdoutInherit?: true}} options
 */
export function run(parts, { cwd, input, stdoutInherit } = {}) {
  /** @type {childProcess.SpawnSyncOptionsWithBufferEncoding} */
  const options = {
    stdio: ['pipe', stdoutInherit ? 'inherit' : 'pipe', 'inherit'],
    maxBuffer: 1024 * 1024 * 16,  // 16mb
    encoding: 'buffer',
  };
  if (cwd) {
    options.cwd = cwd;
  }
  if (input) {
    options.input = input;
  }

  const [command, ...rest] = parts;
  const { stdout, status, error } = childProcess.spawnSync(command, rest, options);
  if (error) {
    throw error;
  }
  if (status) {
    throw new Error(`code: ${status}`);
  }
  return stdout;
}



/**
 * @param {string} tool
 * @param {{input?: Buffer, args?: string[]}} options
 * @return {Buffer}
 */
export function toolInvoke(tool, { input, args } = {}) {
  const p = path.join('tools', tool);
  return run([p, ...args ?? []], { input, cwd: rootDir });
}
