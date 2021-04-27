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
 * @fileoverview Downloads specific paths from Chromium source into a local working directory.
 */


import { cache, networkFetcher } from './cache.js';
import * as zlib from 'zlib';
import tar from 'tar-stream';
import * as stream from 'stream';
import * as path from 'path';
import { promises as fsPromises } from 'fs';


const defaultRevision = 'main';


/**
 * @param {string} revision
 * @param {string} chromePath
 * @return {string}
 */
function urlFor(revision, chromePath) {
  return `https://chromium.googlesource.com/chromium/src/+archive/${revision}/${chromePath}.tar.gz`;
}


/**
 * Fetches all of the specified paths of the Chromium source tree to a target work path.
 * 
 * @param {string} targetPath target work folder to extract to
 * @param {string[]} chromePaths chrome subtree paths to fetch
 * @param {string} revision revision to fetch
 * @return {Promise<number[]>} total files written for paths (-1 for missing)
 */
export async function fetchAllTo(targetPath, chromePaths, revision = defaultRevision) {
  chromePaths = chromePaths.slice().map((chromePath) => {
    if (chromePath.endsWith('/')) {
      return chromePath.slice(0, -1);
    }
    return chromePath;
  });
  chromePaths.sort();  // moves smaller 1st

  const totals = await Promise.all(chromePaths.map((chromePath, i) => {
    for (let j = 0; j < i; ++j) {
      const previous = chromePaths[j];
      if (chromePath.startsWith(previous + '/')) {
        return 0; // skip, we'll get this one
      }
    }
    return fetchTo(targetPath, chromePath, revision);
  }));

  return totals;
}


/**
 * Fetch the specified part of the Chromium source tree into the target work path.
 *
 * Returns the number of files generated, or -1 if the file was missing.
 *
 * @param {string} targetPath target work folder to extract to
 * @param {string} chromePath chrome subtree path
 * @param {string} revision revision to fetch
 * @return {Promise<number>} total files written, or -1 for missing
 */
export async function fetchTo(targetPath, chromePath, revision = defaultRevision) {
  const extractPath = path.join(targetPath, chromePath);
  await fsPromises.mkdir(extractPath, { recursive: true });

  const url = urlFor(revision, chromePath);

  const transform = (buffer) => {
    return new Promise((resolve, reject) => {
      zlib.gunzip(buffer, (err, result) => err ? reject(err) : resolve(result));
    });
  };
  let bytes;
  try {
    bytes = await cache(`${url}#decompressed`, networkFetcher(url, transform));
  } catch (e) {
    // ignore! Probably missing at this revision!
    return -1;
  }

  const writes = [];

  /**
   * @param {string} name
   * @param {Buffer} buffer
   */
  const writeFile = (name, buffer) => {
    const task = async () => {
      const writePath = path.join(extractPath, name);
      await fsPromises.mkdir(path.dirname(writePath), { recursive: true });
      await fsPromises.writeFile(writePath, buffer);
    };
    writes.push(task());
  }

  await new Promise((resolve, reject) => {
    const extract = tar.extract();

    extract.on('entry', (header, s, next) => {
      const chunks = [];

      s.on('error', reject);
      s.on('data', (chunk) => chunks.push(chunk));
      s.on('end', () => {
        if (!header.name.endsWith('/')) {
          writeFile(header.name, Buffer.concat(chunks));
        }
        next();
      });
      s.resume();
    });

    extract.on('error', reject);
    extract.on('finish', () => resolve(undefined));

    const readable = new stream.Readable();
    readable.push(bytes);
    readable.push(null);
    readable.pipe(extract);
  });

  await Promise.all(writes);
  return writes.length;
}