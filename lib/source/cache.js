/**
 * Copyright 2020 Google LLC
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
 * @fileoverview Helpers to fetch and cache URLs.
 */


import fetch from 'node-fetch';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import findCacheDir from 'find-cache-dir';


const cachePath = findCacheDir({name: 'chrome-types-helpers'});


const defaultCacheExpiry = 60 * 60 * 1000;  // 1hr


/**
 * @param {string} p
 * @return {Promise<fs.Stats?>}
 */
function statOrNull(p) {
  return fsPromises.stat(p).catch((e) => null);
}


/**
 * @param {string} id
 * @param {() => Promise<Buffer>} fetcher
 * @param {number} expiry in ms
 * @return {Promise<Buffer>}
 */
export async function cache(id, fetcher, expiry = defaultCacheExpiry) {
  const key = Buffer.from(id).toString('base64').replace('/', '-');

  const singleCachePath = path.join(cachePath, key);
  const stat = await statOrNull(singleCachePath);
  if (stat !== null && stat.mtimeMs >= +(new Date()) - expiry) {
    return fsPromises.readFile(singleCachePath);
  }

  const bufferToCache = await fetcher();

  await fsPromises.mkdir(cachePath, { recursive: true });
  await fsPromises.writeFile(singleCachePath, bufferToCache);

  return bufferToCache;
}


/**
 * Builds a fetcher that goes to the network for a URL.
 *
 * @param {string} url to fetch
 * @param {function(Buffer): Promise<Buffer>|Buffer=} transform
 * @return {function(): Promise<Buffer>}
 */
export function networkFetcher(url, transform = async (x) => x) {
  return async () => {
    const r = await fetch(url);
    if (!r.ok) {
      throw new Error(`failed to fetch: ${r.status} ${r.statusText}: ${url}`);
    }
    const buffer = await r.buffer();
    return transform(buffer);
  };
}
