/**
 * Copyright 2026 Google LLC
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
import { applyRelease } from '../../tools/lib/release-history.js';
import * as chromeTypes from '../../types/chrome.js';


test('first release is a baseline', t => {
  /** @type {chromeTypes.AllReleasesSymbolData} */
  const all = {};
  applyRelease(all, 4, { 'api:tabs': {} }, true);
  t.deepEqual(all, { 'api:tabs': { high: 4 } });
});

test('empty release before the first symbols', t => {
  /** @type {chromeTypes.AllReleasesSymbolData} */
  const all = {};
  applyRelease(all, 3, {}, true);
  applyRelease(all, 4, { 'api:tabs': {} }, false);
  t.deepEqual(all, { 'api:tabs': { high: 4, low: 4 } });
});

test('a symbol that leaves and returns starts over', t => {
  /** @type {chromeTypes.AllReleasesSymbolData} */
  const all = {};
  applyRelease(all, 28, { 'api:audio': {} }, false);
  applyRelease(all, 29, {}, false);
  applyRelease(all, 30, { 'api:audio': {} }, false);
  t.deepEqual(all, { 'api:audio': { high: 30, low: 30 } });
});

test('a symbol that returns deprecated keeps its run', t => {
  /** @type {chromeTypes.AllReleasesSymbolData} */
  const all = {};
  applyRelease(all, 4, { 'api:tabs.getSelected': {} }, false);
  applyRelease(all, 31, {}, false);
  applyRelease(all, 33, { 'api:tabs.getSelected': { deprecated: true } }, false);
  t.deepEqual(all, { 'api:tabs.getSelected': { high: 33, low: 4, deprecated: 33 } });
});
