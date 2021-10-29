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

import test from 'ava';
import { generateLinesHash } from '../tools/lib/line-hash.js';

test('line-hash', t => {
  const s1 = `/** This comment can change */
// This line is ignored
class Foo {}`;

  const s2 = `/** This comment can change */
  // This line can change and we don't care
class Foo {}`;

  t.is(generateLinesHash(s1), generateLinesHash(s2));

  const s3 = `/** Major line change */
// bleh
class Foo {}`;

  t.notDeepEqual(generateLinesHash(s1), generateLinesHash(s3));
});
