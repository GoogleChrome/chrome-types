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


import * as crypto from 'crypto';


const hashLength = 16;
const singleLineCommentRegexp = /\s*\/\/.*$/gm;


/**
 * Generates a hash for the given source(s), while stripping all single-line comments. This is
 * helpful to still include creation time (and so on) while not effecting the hash.
 *
 * @param {(string|Buffer)[]} raw
 * @return {string}
 */
export function generateLinesHash(...raw) {
  let s = raw.map((x) => x.toString('utf-8')).join('\n');
  s = s.replace(singleLineCommentRegexp, '');

  // This is not used for a cryptographic purpose. It's just a hash of the build to compare against
  // other builds.
  const c = crypto.createHash('sha256');
  c.update(s);
  const digest = c.digest('hex');

  const out = digest.substr(0, hashLength);
  if (!raw.length || out.length !== hashLength) {
    throw new Error(`could not generate hash: ${out}`);
  }

  return out;
}
