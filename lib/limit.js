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


import * as os from 'os';


class Semaphore {
  #count = 0;

  /** @type {(() => void)[]} */
  #pending = [];

  release(value = 1) {
    for (let i = 0; i < value; ++i) {
      const next = this.#pending.shift();
      if (next) {
        next();
      } else {
        ++this.#count;
      }
    }
  }

  async acquire() {
    if (this.#count === 0) {
      await /** @type {Promise<void>} */ (new Promise((r) => this.#pending.push(r)));
    } else {
      --this.#count;
    }
  }
}


const DEFAULT_CPUS = os.cpus().length;


/**
 * @template T
 * @param {T & ((...args: any) => Promise<any>)} fn
 * @param {number} count
 * @return {T}
 */
export function buildLimit(fn, count = DEFAULT_CPUS / 2) {
  const max = Math.floor(Math.max(1, count));

  const s = new Semaphore();
  s.release(max);

  const out = async (...args) => {
    await s.acquire();
    try {
      return await fn(...args);
    } finally {
      s.release();
    }
  };
  return /** @type {T} */ (/** @type {unknown} */ (out));
}
