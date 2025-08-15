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


import * as zlib from 'zlib';
import tar from 'tar-stream';
import * as stream from 'stream';
import * as path from 'path';
import { promises as fsPromises } from 'fs';
import fetch from 'node-fetch';


/**
 * @param {string} revision
 * @param {string} chromePath
 * @return {string}
 */
export function urlFor(revision, chromePath) {
  return `https://chromium.googlesource.com/chromium/src/+archive/${revision}/${chromePath}.tar.gz`;
}


/**
 * Fetches all of the specified paths of the Chromium source tree to a target work path.
 * 
 * @param {string} targetPath target work folder to extract to
 * @param {string[]} chromePaths chrome subtree paths to fetch
 * @param {string} revision revision to fetch
 * @return {Promise<(string[]?)[]>} files written for paths, null for skipped
 */
export function fetchAllTo(targetPath, chromePaths, revision) {
  // This removes any trailing "/" from the paths.
  chromePaths = chromePaths.map(chromePath => path.join(chromePath, '.'));

  // Move the smaller paths first, so that we the following code can skip paths that we already
  // have (because the compressed version of a higher folder was fetched).
  chromePaths.sort();

  return Promise.all(chromePaths.map(async (chromePath, i) => {
    const isSatisfied = chromePaths.slice(0, i).some(previous => {
      return chromePath.startsWith(previous + '/');
    });
    if (isSatisfied) {
      return null;  // we'll already have something for this
    }
    return fetchTo(targetPath, chromePath, revision);
  }));
}


/**
 * Fetch the specified part of the Chromium source tree into the target work path.
 *
 * Returns the number of files generated, or -1 if the file was missing.
 *
 * @param {string} targetPath target work folder to extract to
 * @param {string} chromePath chrome subtree path
 * @param {string} revision revision to fetch
 * @return {Promise<string[]>} files written
 */
export async function fetchTo(targetPath, chromePath, revision) {
  const url = urlFor(revision, chromePath);

  const r = await fetch(url, { compress: false });
  if (!r.ok) {
    // HACK: Old platform_apps folder is missing. Skip for now.
    if (r.status === 400 && chromePath === 'chrome/common/apps/platform_apps/api') {
      return [];
    }
    throw new Error(`could not fetch URL from Chromium: ${url}, ${r.statusText} (${r.status})`);
  }

  const arrayBuffer = await fetch(url).then(r => r.arrayBuffer());
  const bytes = await new Promise((resolve, reject) => {
    zlib.gunzip(arrayBuffer, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });

  const extractPath = path.join(targetPath, chromePath);
  await fsPromises.mkdir(extractPath, { recursive: true });

  /** @type {Promise<string>[]} */
  const writes = [];

  /** @type {(name: string, buffer: Buffer) => void} */
  const writeFile = (name, buffer) => {
    const task = async () => {
      const writePath = path.join(extractPath, name);
      await fsPromises.mkdir(path.dirname(writePath), { recursive: true });
      await fsPromises.writeFile(writePath, buffer);
      return path.join(chromePath, name);
    };
    writes.push(task());
  };

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

  return Promise.all(writes);
}