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
import * as traverse from '../../tools/lib/traverse.js';
import * as chromeTypes from '../../types/chrome.js';


// Helper used for forEach tests below.
const buildHandler = () => {
  /** @type {{spec: chromeTypes.TypeSpec, childId: string}[]} */
  const arr = [];
  /** @type {(spec: chromeTypes.TypeSpec, childId: string) => void} */
  const callback = (spec, childId) => void arr.push({ spec, childId });

  return { arr, callback };
};


/**
 * @template T
 * @param {T} t
 * @return {T}
 */
function cloneObject(t) {
  return JSON.parse(JSON.stringify(t));
};


test('ids', t => {
  t.is(traverse.last('api:foo.bar.zing'), 'zing');

  t.is(traverse.parentId('api:foo.bar.zing'), 'api:foo.bar');
  t.is(traverse.parentId('api:foo'), '');

  t.is(traverse.namespaceNameFromId('api:bar.zing.Whatever'), 'bar');
  t.is(traverse.namespaceNameFromId('other:bar.zing.Whatever'), '');
  t.is(traverse.namespaceNameFromId('bar.zing.Whatever'), '');
  t.is(traverse.namespaceNameFromId('api:test'), 'test');
});


test('forEach', t => {
  const filter = () => true;
  const tc = new traverse.TraverseContext(filter);

  // Check that childId is passed properly for dictionaries.
  {
    /** @type {{[id: string]: chromeTypes.TypeSpec}} */
    const properties = {
      'foo': { type: 'number' },
      'que': { type: 'void' },
    };

    const { arr, callback } = buildHandler();
    tc.forEach(cloneObject(properties), 'api:bar.Zing', callback);

    t.deepEqual(arr, [
      { spec: properties['foo'], childId: 'api:bar.Zing.foo' },
      { spec: properties['que'], childId: 'api:bar.Zing.que' },
    ]);
  }

  // Check that childId is passed properly for arrays.
  {
    /** @type {chromeTypes.TypeSpec[]} */
    const children = [
      { type: 'number', name: 'test1' },
      { type: 'object', name: 'test2', properties: {} },
    ];

    const { arr, callback } = buildHandler();
    tc.forEach(cloneObject(children), 'api:bar.Zing', callback);

    t.deepEqual(arr, [
      { spec: children[0], childId: 'api:bar.Zing.test1' },
      { spec: children[1], childId: 'api:bar.Zing.test2' },
    ]);
  }

});


test('expandFunctionParams', t => {
  const filter = () => true;
  const tc = new traverse.TraverseContext(filter);

  /** @type {chromeTypes.TypeSpec} */
  const earlyOptionalFunction = {
    type: 'function',
    parameters: [
      { type: 'number', name: 'n', optional: true },
      { type: 'string', name: 's' },
    ],
  };

  // This has an extra expansion as the 1st argument can be optional.
  const earlyOptionalExpansions = tc.expandFunctionParams(earlyOptionalFunction, 'api:test');
  t.deepEqual(earlyOptionalExpansions, [
    [{ type: 'void', name: 'return' }, { type: 'number', name: 'n' }, { type: 'string', name: 's' }],
    [{ type: 'void', name: 'return' }, { type: 'string', name: 's' }],
  ]);

  /** @type {chromeTypes.TypeSpec} */
  const lateOptionalFunction = {
    type: 'function',
    parameters: [
      { type: 'number', name: 'n' },
      { type: 'string', name: 's', optional: true },
    ],
  };

  // This doesn't have expansions, because optional is only on the right.
  const lateOptionalExpansions = tc.expandFunctionParams(lateOptionalFunction, 'api:test');
  t.deepEqual(lateOptionalExpansions, [
    [{ type: 'void', name: 'return' }, { type: 'number', name: 'n' }, { type: 'string', name: 's', optional: true }],
  ]);

});


test('expandFunctionParams returns', t => {
  const filter = () => true;
  const tc = new traverse.TraverseContext(filter);

  /** @type {chromeTypes.TypeSpec} */
  const returnsFunction = {
    type: 'function',
    parameters: [
      { type: 'string', name: 's', optional: true },
    ],
    returns: { type: 'double' },
  };

  const returnsFunctionExpansions = tc.expandFunctionParams(returnsFunction, 'api:test');
  t.deepEqual(returnsFunctionExpansions, [
    [{ type: 'double', name: 'return' }, { type: 'string', name: 's', optional: true }],
  ]);

});

test('expandFunctionParams returns_async', t => {
  const filter = () => true;
  const tc = new traverse.TraverseContext(filter);

  /** @type {chromeTypes.TypeSpec} */
  const returnsAsyncFunction = {
    type: 'function',
    parameters: [
      { type: 'string', name: 's' },
    ],
    returns_async: {
      name: 'callback',
      type: 'function',
      parameters: [{ type: 'number', name: 'whatever' }],
    },
  };

  // Because the expansion supports a Promise if this is missing, we expect it to be passed back to
  // us with `optional: true`.
  const expectedOptionalReturnsAsync = /** @type {chromeTypes.NamedTypeSpec} */ (
    { ...returnsAsyncFunction.returns_async, optional: true }
  );

  const returnsAsyncFunctionExpansions = tc.expandFunctionParams(
    cloneObject(returnsAsyncFunction),
    'api:test',
    true
  );
  t.deepEqual([
    [
      {
        $ref: 'Promise',
        name: 'return',
        value: ['return', { name: 'whatever', type: 'number' }],
      },
      { type: 'string', name: 's' },
    ],
    [
      { type: 'void', name: 'return' },
      { type: 'string', name: 's' },
      expectedOptionalReturnsAsync,
    ]
  ], returnsAsyncFunctionExpansions);
});

test('expandFunctionParams returns_async does_not_support_promises', t => {
  const filter = () => true;
  const tc = new traverse.TraverseContext(filter);

  /** @type {chromeTypes.TypeSpec} */
  const returnsAsyncFunction = {
    type: 'function',
    parameters: [
      { type: 'string', name: 's' },
    ],
    returns_async: {
      name: 'callback',
      type: 'function',
      does_not_support_promises: 'For testing',
      parameters: [{ type: 'number', name: 'whatever' }],
    },
  };

  const returnsAsyncFunctionExpansions = tc.expandFunctionParams(
    cloneObject(returnsAsyncFunction),
    'api:test',
  );
  // Since this does not support promises, we expect to only get the callback signature.
  t.deepEqual(returnsAsyncFunctionExpansions, [
    [
      { type: 'void', name: 'return' },
      { type: 'string', name: 's' },
      { ...returnsAsyncFunction.returns_async },
    ]
  ]);
});

test('filter', t => {
  /** @type {(spec: chromeTypes.TypeSpec, id: string) => boolean} */
  const filter = (spec, id) => {
    if (id.endsWith('.foo')) {
      return false;
    }
    return true;
  };

  const tc = new traverse.TraverseContext(filter);

  /** @type {{[id: string]: chromeTypes.TypeSpec}} */
  const properties = {
    'foo': { type: 'number', name: 'foo' },
    'que': { type: 'void', name: 'que' },
  };

  const { arr, callback } = buildHandler();
  tc.forEach(cloneObject(properties), 'api:bar.Zing', callback);

  const fooProperty = arr.find(({spec: {name}}) => name === 'foo')
  t.falsy(fooProperty, 'foo should be filtered out');
});
