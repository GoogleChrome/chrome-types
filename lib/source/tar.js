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


import * as zlib from 'zlib';
import tar from 'tar-stream';
import * as stream from 'stream';


/**
 * @param {Buffer} bytes
 */
export async function tarToFiles(bytes) {
  const unzippedPromise = /** @type {Promise<Buffer>} */ (new Promise((resolve, reject) => {
    zlib.gunzip(bytes, (err, result) => err ? reject(err) : resolve(result));
  }));

  try {
    bytes = await unzippedPromise;
  } catch {
    // ignore
  }

  /**
   * @type {{[name: string]: Buffer}}
   */
  const files = {};

  await new Promise((resolve, reject) => {
    const extract = tar.extract();

    extract.on('entry', (header, s, next) => {
      const chunks = [];

      s.on('error', reject);
      s.on('data', (chunk) => chunks.push(chunk));
      s.on('end', () => {
        if (!header.name.endsWith('/')) {
          files[header.name] = Buffer.concat(chunks);
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

  return files;
}