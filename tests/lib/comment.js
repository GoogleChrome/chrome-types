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
  regexpParts,
  transformEven,
  isUrl,
  rewriteCommentHrefs,
} from '../../tools/lib/comment.js';

test('regexpParts', (t) => {
  let rp;

  // Returns original text as single element in array if no match
  rp = regexpParts('abc', /1/);
  t.is(rp[0], 'abc');
  t.is(rp.length, 1);

  // Returns original text if no match
  const match = `{@link ContentBounds}`;
  const text = `Get the window's inner bounds as a ${match} object.`;
  rp = regexpParts(text, /{@link.+?}/gs);
  t.is(rp[1], match);
  t.is(rp.length, 3);
});

test('transformEven', (t) => {
  let te;
  let arr = ['1', '2', '3', '4'];
  const helper = (s) => s + '-';

  // Modify even elements
  te = transformEven(arr, helper);
  for (let i = 0; i < te.length; i++) {
    const addedByHelper = i % 2 === 0 ? '-' : '';
    t.is(te[i], arr[i] + addedByHelper);
  }
});

test('isUrl', async (t) => {
  let iu;

  // Valid URLs should return true
  iu = isUrl('https://web.dev');
  t.is(iu, true);
  iu = isUrl('http://web.dev');
  t.is(iu, true);
  iu = isUrl('https://web.dev/learn');
  t.is(iu, true);

  // Incalid URLs should return false
  iu = isUrl(':web.dev');
  t.is(iu, false);
  iu = isUrl('web.dev');
  t.is(iu, false);
});

test('rewriteCommentHrefs', async (t) => {
  let rch;

  // rewrite href
  const resolveHref = (path) => new URL(path, 'https://web.dev').toString();
  const href = '/learn';
  const contents = `Here's a link!`;
  const rewrittenHref = resolveHref(href);
  const text = `<a href="${href}">${contents}</a>`;
  const rewrittenText = `<a href="${rewrittenHref}">${contents}</a>`;
  rch = rewriteCommentHrefs(text, resolveHref);
  t.is(rch, rewrittenText);

  // throw when anchor has other properties
  t.throws(() =>
    rewriteCommentHrefs(`<a class="a" href="${href}"></a>`, resolveHref)
  );
  t.throws(() =>
    rewriteCommentHrefs(`<a href="${href}" target="_blank"></a>`, resolveHref)
  );

  // If `resolveHref` function returns `undefined` then don't change link
  // @ts-ignore
  rch = rewriteCommentHrefs(text, () => undefined);
  t.is(rch, text);

  // If `resolveHref` function doesn't return a url create `@link`
  rch = rewriteCommentHrefs(text, () => contents);
  t.is(rch, `{@link ${contents}}`);
});
