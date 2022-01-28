/**
 * Copyright 2022 Google LLC
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

import test from 'ava';
import { readFromCache, writeToCache } from '../../tools/lib/cache-helper.js';

const filename = 'file.txt';
const message = 'abc';

test('readFromCache', (t) => {
  let rfc;

  // Returns message if file is found
  writeToCache(filename, message);
  rfc = readFromCache(filename);
  t.deepEqual(rfc, Buffer.from(message));

  // Returns null if file has expired
  writeToCache(filename, message);
  rfc = readFromCache(filename, -100);
  t.is(rfc, null);

  // Returns null if file is not found
  rfc = readFromCache(String(Math.random()));
  t.is(rfc, null);

  // Returns null if no file name is provided
  rfc = readFromCache('');
  t.is(rfc, null);
});

test('writeToCache', (t) => {
  // `writeToCache` doesn't throw an error with valid arguments
  t.notThrows(() => {
    writeToCache(filename, message);
    writeToCache(filename, Buffer.from(message));
  });

  // `writeToCache` throws an error with invalid arguments
  t.throws(() => {
    //@ts-ignore
    writeToCache(filename, new Promise());
  });
});
