/**
 * Copyright 2020 Google LLC
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


 // Matches the left-spacing and the "@chrome-namespace" tag in a long-form comment.
const namespaceRegexp = /^(\s+)\*\s+@chrome-namespace\s+([\S]+)\s*$/m;


// Matches a single @-tag in a long-form comment.
const tagRegexp = /^\s+\* (@.*)\s*$/;


/**
 * Extract the singular exported namespace from generated TypeDoc.
 *
 * This looks for "@chrome-namespace" inside a comment.
 *
 * @param {string} raw
 * @return {string} namespace starting without "chrome."
 */
export function extractNamespaceName(raw) {
  const namespaceMatch = namespaceRegexp.exec(raw);
  if (!namespaceMatch) {
    throw new Error(`could not extract namespace`);
  }

  const suffix = namespaceMatch[2];
  if (suffix.startsWith('chrome.')) {
    throw new Error(`expected sufix namespace, got: ${suffix}`);
  }
  return suffix;
}


/**
 * Inserts any number of additional @-tags after "@chrome-namespace" found inside a comment.
 *
 * Doesn't include a tag if it was already in the source code.
 *
 * @param {string} raw
 * @param {string[]} tags to insert
 * @return {string}
 */
export function insertTagsAtNamespace(raw, tags) {
  const namespaceMatch = namespaceRegexp.exec(raw);
  if (!namespaceMatch) {
    throw new Error(`could not find namespace tag to attach to`);
  }

  const newlineAt = namespaceMatch.index + namespaceMatch[0].length;
  const commentEnd = raw.indexOf('*/', newlineAt);
  if (commentEnd === -1) {
    throw new Error(`could not find comment end`);
  }

  // Find all other @-tags after @chrome-namespace, and don't include an inserted tag if we already
  // have it.
  // This occurs because we mark certain APIs as specific to a platform inside the source tool.
  const existingTags = findAllCommentTags(raw, newlineAt);
  tags = tags.filter((tag) => !existingTags.includes(tag));

  const spacing = namespaceMatch[1];
  const assembled = tags.map((tag) => {
    return `\n${spacing}* ${tag}`;
  }).join('');

  return raw.slice(0, newlineAt) + assembled + raw.slice(newlineAt);
}


/**
 * Searches the comment under the specifed cursor for @-tags.
 *
 * @param {string} raw
 * @param {number} around
 */
function findAllCommentTags(raw, around) {
  const startOfComment = raw.lastIndexOf('/*', around);
  const endOfComment = raw.indexOf('*/', around);
  if (startOfComment === -1 || endOfComment === -1) {
    throw new Error(`could not find /* */ comment`);
  }

  const tags = [];
  const existingLines = raw.slice(startOfComment, endOfComment).split('\n');
  existingLines.forEach((line) => {
    const m = tagRegexp.exec(line);
    if (m) {
      tags.push(m[1]);
    }
  });
  return tags;
}
