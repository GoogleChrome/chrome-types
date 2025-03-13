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
import { convertFromIdl } from '../../tools/lib/idl-convert.js';
import { fetchAllTo } from '../../tools/lib/chrome-source.js';
import { toolsPaths } from '../../tools/prepare.js';
import { chromeVersions } from '../../tools/lib/chrome-versions.js';

test('convertFromIdl', async (t) => {
  // Make sure IDL still generated
  const filename = '.assets/sample.idl';
  let root = process.cwd();

  if (process.env.CI) {
    const {head} = await chromeVersions()
    await fetchAllTo(root, toolsPaths, head);
  }

  await t.notThrowsAsync(() =>
    convertFromIdl(root, filename)
  );
});
