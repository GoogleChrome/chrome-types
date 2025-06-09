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
  rootDir,
  run,
  toolInvoke
} from '../../tools/lib/spawn-helper.js';

test('rootDir',(t) => {
  // rootDir is correct
  t.is(rootDir, `${process.cwd()}/`);
});

test('run', (t) => {
  // Runs code in terminal
  t.notThrows(() => run(['node', '-v']));

  // Throws error with invalid command
  t.throws(() => run(['abc']));

  // Throws error when status is output
  t.throws(() => run(['node', '-e', 'process.exit(1);']));
})

test('toolInvoke', async (t) => {
  // Don't run because it actually runs full command, does work though
  // // Runs file
  // t.notThrows(() => toolInvoke('prepare-history.js'));

  // Throws error with invalid file
  t.throws(() => toolInvoke(''));
});
