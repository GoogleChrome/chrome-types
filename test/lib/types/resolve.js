/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License t
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import test from 'ava';
import {exportedChildren, resolveLink, fullName} from '../../../lib/types/resolve.js';
import {parse} from './helper.js';
import * as typedocModels from 'typedoc/dist/lib/models/index.js';


test('resolveLink', t => {
  const project = parse(`
declare namespace chrome {
  export namespace foo {
    export type Foo = number;
  }
  export namespace bar {
    export type Bar = number;
    export function barFunc(arg2: number, arg: {x: string}): void;
    export function barFunc(arg: {x: number}): void;
  }
}
  `);

  const r = project.findReflectionByName('chrome.foo.Foo');
  if (!r) {
    throw new Error(`can't find chrome.foo.Foo`);
  }

  t.is(resolveLink(r, 'foo.Foo'), r);
  t.truthy(resolveLink(r, 'bar.Bar'));
  t.truthy(resolveLink(r, 'chrome.bar'));
  t.falsy(resolveLink(r, 'Bar'));

  t.truthy(resolveLink(r, 'bar.barFunc.arg.x'));
  t.truthy(resolveLink(r, 'chrome.bar.barFunc.arg2'));
  t.falsy(resolveLink(r, 'bar.barFunc.arg2.x'));

  const arg2 = resolveLink(r, 'chrome.bar.barFunc.arg2');
  if (!arg2) {
    throw new Error(`couldn't resolve for test`);
  }
  t.is(fullName(arg2), 'chrome.bar.barFunc.arg2');
});

test('exportedChildren', t => {
  const project = parse(`
declare namespace chrome {
  export namespace foo {
    export const foo = 1;
  }
  namespace _bar {
    export const bar = 123;
    function blehBarFunc(): void;
    export {blehBarFunc as barFunc};
  }
  export {_bar as bar};
  namespace ignored {
    export const ignored = 456;
  }
}
  `);

  // As of Feb 2021, the way we parse a .d.ts file only gives us the exported types. If this test
  // has broken, look at the very simple implementation of exportedChildren.
  const children = exportedChildren(project.getChildByName('chrome'));
  t.deepEqual(Object.keys(children), ['bar', 'foo']);

  const barReflection = children['bar'];
  t.deepEqual(
    Object.keys(exportedChildren(barReflection, typedocModels.ReflectionKind.Function)),
    ['barFunc'],
    'exportedChildren should filter to mask'
  );
});
