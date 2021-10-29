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
import { RenderContext } from '../tools/lib/render-context.js';
import { EmptyRenderOverride } from '../tools/override.js';
import * as chromeTypes from '../types/chrome.js';


// TODO: This isn't as exhaustive as it should be. Chrome has a variety of types we should be
// testing for.


const emptyOverride = new EmptyRenderOverride();


test('renderTopFunction', t => {
  const rc = new RenderContext(emptyOverride);

  // Render a simple top function.
  const out1 = rc.renderTopFunction({
    name: 'bar',
    parameters: [
      { type: 'string', name: 'a' },
    ],
  }, 'api:foo.bar', true);
  t.is(out1, `

export function bar(

  a: string,
): void;`);

  // Render an expanded top function with a comment on one param.
  const out2 = rc.renderTopFunction({
    name: 'bar',
    description: 'Something about the function',
    parameters: [
      { type: 'string', name: 'a', optional: true, description: 'Some comment' },
      { type: 'number', name: 'b' },
    ],
  }, 'api:foo.bar', true);
  t.is(out2, `

/**
 * Something about the function
 *
 * @param a Some comment
 */
export function bar(

  a: string,

  b: number,
): void;

/**
 * Something about the function
 */
export function bar(

  b: number,
): void;`);

});


test('renderType', t => {
  const rc = new RenderContext(emptyOverride);

  const out1 = rc.renderType({ $ref: 'Promise', value: ['return', { type: 'number' }] }, 'api:whatever.foo');
  t.is(out1, 'Promise<number>');
});


/**
 * RenderContext can double as a helper to announce all seen symbols. Check that calling
 * {@link RenderContext.renderType} will trigger announcements for non-void types.
 */
test('announce', t => {
  /** @type {string[]} */
  const arrived = [];
  const rc = new RenderContext(emptyOverride);
  rc.addCallback((spec, id) => {
    arrived.push(id);
  });

  rc.renderType({ type: 'number' }, 'api:test.number');
  rc.renderType({ type: 'void' }, 'api:test.void');

  t.deepEqual(arrived, [
    'api:test.number',
  ], 'void type should not be announced')
});


test('override', t => {
  const override = new class extends EmptyRenderOverride {

    objectTemplatesFor(id) {
      if (id === 'api:foo.TemplateTest') {
        return 'X, Y, Z = 1';
      }
    }

    /**
     * @return {chromeTypes.TypeSpec | undefined}
     */
    typeOverride(spec, id) {
      if (id === 'api:foo.TemplateTest.foo') {
        // nb. We don't insert the description, because the replacement only happens after the
        // outer object is rendered. So we're checking that it does NOT appear.
        return { type: 'string', description: 'Should not appear' };
      }
    }

    tagsFor(spec, id) {
      if (id === 'api:foo.TemplateTest.foo') {
        return [{ name: 'added' }];
      }
    }

  };
  const rc = new RenderContext(override);

  // Check that template string gets inserted properly, and that the 'foo' property is replaced
  // with some additional tags.
  const buf1 = rc.renderObjectAsType({
    type: 'object',
    properties: { 'foo': { type: 'number' } },
  }, 'api:foo.TemplateTest');
  t.is(buf1, `interface TemplateTest<X, Y, Z = 1> {

  /**
   * @added
   */
  foo: string;
}`);

});
