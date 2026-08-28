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
import {
  splitChromeRelease,
  chromeVersions,
  chromePublishedStable,
} from '../../tools/lib/chrome-versions.js';

test('splitChromeRelease', async (t) => {
  /** @type {any} */
  let scr;

  // Returns undefined if too few parts
  scr = await splitChromeRelease('88.0.4324');
  t.is(scr, undefined);

  // Returns undefined if too many parts
  scr = await splitChromeRelease('88.0.4324.1.1');
  t.is(scr, undefined);

  // Returns major version is invalid
  scr = await splitChromeRelease('a.b.c.d');
  t.is(scr, undefined);

  // Returns undefined if semantic version is invalid
  scr = await splitChromeRelease('88.0.a.1');
  t.is(scr, undefined);

  // Returns release and rest of release tag if valid
  scr = await splitChromeRelease('88.0.4324.47');
  t.deepEqual(Object.keys(scr), ['release', 'rest']);
  t.is(typeof scr.release, 'number');
  t.is(typeof scr.rest, 'string');
});

test('chromeVersions', async (t) => {
  // Returns head and map of chrome version releases
  const cv = await chromeVersions();
  t.is(typeof cv.head, 'string');
  t.is(cv.releases instanceof Map, true);
  t.is(cv.releases.size > 0, true);
  t.deepEqual(Object.keys(cv), ['head', 'releases']);
})

test('chromePublishedStable', async (t) => {
  // Returns number representing current stable version of Chrome
  const cps = await chromePublishedStable();
  t.is(typeof cps, 'number');
});
