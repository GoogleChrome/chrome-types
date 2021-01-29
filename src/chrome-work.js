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

import {cache, networkFetcher} from '../lib/cache.js';
import zlib from 'zlib';
import tar from 'tar-stream';
import * as stream from 'stream';
import * as path from 'path';
import {promises as fsPromises} from 'fs';
import log from 'fancy-log';
import chalk from 'chalk';

/**
 * Fetches all of the specified paths of the Chromium source tree to a target work path.
 * 
 * @param {string} targetPath target work folder to extract to
 * @param {string[]} chromePaths chrome subtree paths to fetch
 * @param {string=} revision revision to fetch
 * @return {!Promise<void>}
 */
export async function fetchAllTo(targetPath, chromePaths, revision = 'master') {
  chromePaths = chromePaths.slice().map((chromePath) => {
    if (chromePath.endsWith('/')) {
      return chromePath.slice(0, -1);
    }
    return chromePath;
  });
  chromePaths.sort();

  await Promise.all(chromePaths.map((chromePath, i) => {
    for (let j = 0; j < i; ++j) {
      const previous = chromePaths[j];
      if (chromePath.startsWith(previous + '/')) {
        return; // skip, we'll get this one
      }
    }
    return fetchTo(targetPath, chromePath, revision);
  }));
}

/**
 * Fetch the specified part of the Chromium source tree into the target work path.
 *
 * @param {string} targetPath target work folder to extract to
 * @param {string} chromePath chrome subtree path
 * @param {string=} revision revision to fetch
 * @return {Promise<void>}
 */
export async function fetchTo(targetPath, chromePath, revision = 'master') {
  const extractPath = path.join(targetPath, chromePath);
  await fsPromises.mkdir(extractPath, {recursive: true});

  const url = `https://chromium.googlesource.com/chromium/src/+archive/${revision}/${chromePath}.tar.gz`;

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
    return;
  }

  const writes = [];

  /**
   * @param {string} name
   * @param {Buffer} buffer
   */
  const writeFile = (name, buffer) => {
    const task = async () => {
      const writePath = path.join(extractPath, name);
      await fsPromises.mkdir(path.dirname(writePath), {recursive: true});
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

  log(`Fetched ${chalk.green(chromePath)} ${chalk.red(revision)} (${writes.length} files)`);
  await Promise.all(writes);
}