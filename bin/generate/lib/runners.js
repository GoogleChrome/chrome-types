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


/**
 * @fileoverview Quick helper for exec which wraps childProcess.
 */


import * as childProcess from 'child_process';
import * as os from 'os';


/**
 * @param {string[]} args
 * @param {string} cwd
 * @param {string|undefined} stdin
 * @return {!Promise<{code: number, out: Buffer}>}
 */
export function exec(args, cwd, stdin=undefined) {
  args = args.slice();
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
 * Runs a number of tasks in async parallel.
 * 
 * @template T
 * @template V
 * @param {T[]} sourceArray source
 * @param {function(T): Promise<V>|V} work to perform
 * @param {number=} count of tasks, equal to CPUs
 * @return {Promise<V[]>} results
 */
export async function tasks(sourceArray, work, count = os.cpus().length) {
  count = Math.max(1, Math.ceil(count));
  let index = 0;
  const outputArray = new Array(sourceArray.length);

  const worker = async (i) => {
    while (index < sourceArray.length) {
      const localIndex = index;
      ++index;

      const source = sourceArray[localIndex];
      const result = await work(source);
      outputArray[localIndex] = result;
    }
  };

  const workerPromises = [];
  for (let i = 0; i < count; ++i) {
    workerPromises.push(worker(i));
  }
  await Promise.all(workerPromises);

  return outputArray;
}
