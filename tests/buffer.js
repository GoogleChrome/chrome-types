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
import { RenderBuffer } from '../tools/lib/buffer.js';


test('comment', t => {

  const buf1 = new RenderBuffer();
  buf1.comment('', []);
  t.true(buf1.isEmpty);

  const buf2 = new RenderBuffer();
  buf2.comment('Foo\nBar', [{ name: 'hello' }]);
  t.is(buf2.render(), `
/**
 * Foo
 * Bar
 *
 * @hello
 */`);

 const buf3 = new RenderBuffer();
 buf3.comment('', [{ name: 'hello', value: 'There  ' }, { name: 'hello' }]);
 t.is(buf3.render(), `
/**
 * @hello There
 * @hello
 */`);

});


test('stack', t => {

  const inner = new RenderBuffer();
  inner.line('// Hello');
  inner.line();
  inner.line('export function foo() {}')

  const out = new RenderBuffer();
  out.start('{');
  out.append(inner);
  out.end('}');

  t.is(out.render(), `{
  // Hello

  export function foo() {}
}`)

});
