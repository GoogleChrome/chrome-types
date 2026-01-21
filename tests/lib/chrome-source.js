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
import {tmpdir} from 'os';
import { urlFor, fetchAllTo } from '../../tools/lib/chrome-source.js';

const revision = '23a41c068e35f33df1c3579a3b0b469d4458e6c1';
const chromePath = 'chrome/common/apps/platform_apps/api';
const chromePaths = [
  'tools/json_schema_compiler',
  'tools/json_schema_compiler/test',
  'tools/json_comment_eater',
  'ppapi/generators',
  'third_party/ply',
];

test('urlFor', (t) => {
  // Returns valid url
  const uf = urlFor(revision, chromePath);
  t.is(uf.startsWith('https://'), true);
  t.is(uf.includes(revision), true);
  t.is(uf.endsWith(`${chromePath}.tar.gz`), true);
});

test('fetchAllTo', async (t) => {
  let fta;
  // Returns chrome source tree files for each path
  fta = await fetchAllTo(tmpdir(), chromePaths, revision);
  t.is(Array.isArray(fta), true);
  t.is(fta.length, chromePaths.length);

  // Throws error with invalid arguments
  // @ts-ignore
  await t.throwsAsync(() => fetchAllTo(null, chromePaths, revision));
  // @ts-ignore
  t.throws(() => fetchAllTo(tmpdir(), null, revision));
  // @ts-ignore
  await t.throwsAsync(() => fetchAllTo(tmpdir(), chromePaths, null));
});
