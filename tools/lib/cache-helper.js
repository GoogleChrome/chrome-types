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
import * as path from 'path';


export const hourMs = 1000 * 60 * 60;


/**
 * The cache directory of the types project.
 */
export const { pathname: cacheDir } = new URL('../../.cache', import.meta.url);


/**
 * @param {string} name to fetch
 * @param {number=} expiry default 48hr
 */
export function readFromCache(name, expiry = 48 * hourMs) {
  const p = path.join(cacheDir, name);

  try {
    const stat = fs.statSync(p);
    if (stat.mtimeMs < +(new Date) - expiry) {
      return null;
    }
  } catch {
    return null;
  }

  try {
    return fs.readFileSync(p);
  } catch {
    return null;
  }
}


/**
 * @param {string} name to write
 * @param {Buffer|string} buffer write
 */
export function writeToCache(name, buffer) {
  const p = path.join(cacheDir, name);
  const dir = path.dirname(p);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, buffer);
}
