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


export class Semaphore {
  #count = 0;

  /** @type {(() => void)[]} */
  #pending = [];

  constructor(count = 0) {
    this.#count = Math.ceil(count || 0);  // ensure integer
  }

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
