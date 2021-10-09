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


const keywords = [
  'debugger',
  'delete',
  'import',
  'export',
  'void',
  'function',
  'switch',
  // There's more, but we only hit a few for now.
];

/**
 * @param {string} arg 
 * @return {boolean}
 */
export function isValidToken(arg) {
  if (keywords.includes(arg)) {
    return false;
  }
  if (arg[0] >= '0' && arg[0] <= '9') {
    return false;
  }

  return true;
}
