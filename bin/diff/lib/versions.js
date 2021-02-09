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


import * as fs from 'fs';
import * as types from '../../../types/symbol.js';
import * as worker from 'async-transforms/worker';


/**
 * @param {string} root
 * @param {{min?: number, max?: number}=} range
 * @return {AsyncGenerator<types.NamesSet, void, void>}
 */
export default async function * allVersions(root, range) {
  const allOnDisk = fs.readdirSync(root).map((raw) => +raw).filter((raw) => isFinite(raw));

  const {min = 0, max = 0} = range ?? {};
  const all = allOnDisk.filter((version) => {
    if (max && version > max) {
      return false;
    } else if (version < min) {
      return false;
    }
    return true;
  });

  // sort low before high
  all.sort((a, b) => +a - +b);

  const {pathname: workerPath} = new URL('./reflection.js', import.meta.url);
  const poolGenerate = worker.pool(workerPath);

  /** @type {(version: number) => Promise<types.NamesSet>} */
  const runner = async (version) => {
    console.warn(`Processing ${version}...`);
    const data = await poolGenerate(root, version);
    console.warn('Chrome', version, 'has', Object.keys(data).length, 'symbols');
    return {version, data};
  };
  const tasks = all.map(runner);

  // Queue all tasks and yield when they complete in order.
  while (tasks.length) {
    const p = /** @type {NonNullable<typeof tasks[0]>} */ (tasks.shift());
    const next = await p;
    yield next;
  }
}
