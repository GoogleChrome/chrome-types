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
import {rewriteBlockComments, rewriteCommentHrefs} from '../../../bin/generate/lib/comment.js';

test('rewrite comment', t => {
  const raw = `
  /**
   * Hello! Block comment!
   * @foo zing
   */
`;

  const out = rewriteBlockComments(raw, (comment, tags) => {
    t.deepEqual(tags, [
      {name: 'foo', value: 'zing'},
    ]);
    tags[0].value = 'bar';
    tags.push({name: 'BLAH', value: ''});
    return 'New text';
  });

  t.is(out, `
  /**
   * New text
   *
   * @foo bar
   * @BLAH
   */
`);

});

test('rewrite href', t => {
  const raw = `<a
href="foo">hi</a>`;

  t.is(rewriteCommentHrefs(raw, (href) => {
    t.is(href, 'foo');
    return 'bar';
  }), `{@link bar hi}`, 'treat naked name as @link');

  t.is(rewriteCommentHrefs(raw, (href) => {
    t.is(href, 'foo');
    return 'hi';
  }), `{@link hi}`, 'don\'t include note if equal');

  t.is(rewriteCommentHrefs(raw, (href) => {
    t.is(href, 'foo');
    return 'http://place';
  }), `<a href="http://place">hi</a>`);
});