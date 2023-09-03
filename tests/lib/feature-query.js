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
import { FeatureQuery } from '../../tools/lib/feature-query.js';

test('FeatureQuery.mergeComplexFeature', (t) => {
  const fq = new FeatureQuery({});
  let mcf;

  // If all dependencie match, then super.mergeComplexFeature returns dependencies
  mcf = fq.mergeComplexFeature([{}, {}]);
  t.deepEqual(mcf, { dependencies: [] });

  // If all dependencie don't equal the first, then super.mergeComplexFeature returns undefined
  mcf = fq.mergeComplexFeature([
    { disallow_for_service_workers: false },
    { disallow_for_service_workers: true },
  ]);
  t.deepEqual(mcf, undefined);
});

test('FeatureQuery.filter', (t) => {
  const fq = new FeatureQuery({});
  let f;

  // If `allowlist` length is greater than `0` return `false`
  f = fq.filter({ allowlist: ['allowed'] });
  t.is(f, false);

  // If `command_line_switch` is defined return `false`
  f = fq.filter({ command_line_switch: 'switch' });
  t.is(f, false);

  // If `session_types` length is greater than `0` don't return `false` (currently this is a passthrough)
  f = fq.filter({ session_types: ['kiosk'] });
  t.is(f, true);

  // If `session_types` exists and includes `'regular'` don't return `false` (currently this is a passthrough)
  f = fq.filter({ session_types: ['regular'] });
  t.is(f, true);

  // If `matches` length is greater than `0` return `false`
  f = fq.filter({ matches: ['<not_all_urls>'] });
  t.is(f, false);

  // If `matches` exists and includes `'<all_urls>'` don't return `false`
  f = fq.filter({ matches: ['<all_urls>'] });
  t.is(f, true);

  // If `extension_types` exists and includes `'extension'` or `'platform_app'` return `true`
  f = fq.filter({ extension_types: ['extension', 'platform_app'] });
  t.is(f, true);

  // If `extension_types` exists and does not include `'extension'` or `'platform_app'` return `false`
  f = fq.filter({ extension_types: ['hosted_app'] });
  t.is(f, false);
});