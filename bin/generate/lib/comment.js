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


/**
 * This monstrosity matches <a href="">...</a> within the generated comments. It allows a variety
 * of syntaxes:
 *
 *   - href with ' or "
 *   - elements over multiple lines (i.e., 's' flag)
 *   - additional tags to the left/right of "href"
 */
const hrefRegexp = /<a(\s+[^>]*?)href\s*=\s*(["'])(.*?)\2(.*?)>(.*?)<\/a>/gms;


/**
 * @param {string} raw
 * @return {boolean}
 */
const isUrl = (raw) => {
  try {
    new URL(raw);
    return true;
  } catch (e) {
    return false;
  }
};


/**
 * @param {string} text
 * @param {(raw: string) => string|undefined} resolveHref
 * @return {string}
 */
export function rewriteCommentHrefs(text, resolveHref) {
  // Rewrite all existing URLs, possibly to @link.
  text = text.replace(hrefRegexp, (all, left, _quote, href, right, contents) => {
    if (left.trim() || right.trim()) {
      throw new Error(`got <a> with extra contents: ${all}`);
    }

    const resolved = resolveHref(href);

    if (resolved === undefined) {
      // do nothing
    } else if (isUrl(resolved)) {
      href = resolved;
    } else {
      if (contents === resolved) {
        return `{@link ${resolved}}`;
      }
      return `{@link ${resolved} ${contents}}`;
    }

    return `<a href=\"${href}\">${contents}</a>`;
  });

  return text;
}


/**
 * This allows for basic rewriting of block comments.
 *
 * @param {string} raw
 * @param {(comment: string, tags: {name: string, value?: string}[]) => string|undefined} callback
 * @return {string}
 */
export function rewriteBlockComments(raw, callback) {
  const parts = [];

  let index = 0;
  for (;;) {
    const startOfComment = raw.indexOf('/*', index);
    if (startOfComment === -1) {
      parts.push(raw.slice(index));
      break;
    }
    parts.push(raw.slice(index, startOfComment));
    const isMagicComment = raw.charAt(startOfComment + 2) === '*';

    const previousNewline = Math.max(0, raw.lastIndexOf('\n', startOfComment));
    const spacing = startOfComment - previousNewline;
    const spaces = ''.padEnd(spacing, ' ');

    const endOfComment = raw.indexOf('*/', startOfComment + 2)
    if (endOfComment === -1) {
      throw new Error(`could not find /* */ comment`);
    }

    const allComment = raw.slice(startOfComment + (isMagicComment ? 3 : 2), endOfComment);

    // Remove leading "  * " from all lines, trim.
    const lines = allComment.split('\n').map((line) => {
      return line.replace(/^\s*\*\s?/, '').trimRight();
    });
    let tagsFrom = lines.findIndex((line) => line[0] === '@');
    if (tagsFrom === -1) {
      tagsFrom = lines.length;
    } 

    // Find all tags and their body content.
    /** @type {{name: string, value?: string}[]} */
    const tags = [];
    /** @type {string=} */
    let tagName = undefined;
    let pendingTagLines = [];
    const maybeYieldTag = () => {
      if (tagName) {
        const raw = {name: tagName};
        const value = pendingTagLines.join(' ').trim();
        if (value) {
          raw.value = value;
        }
        tags.push(raw);
      }
      tagName = undefined;
    };
    for (const line of lines.slice(tagsFrom)) {
      if (line.startsWith('@')) {
        maybeYieldTag();
        tagName = line.substr(1).split(/\s+/)[0];
        pendingTagLines = [line.substr(tagName.length + 1).trim()];
      } else {
        pendingTagLines.push(line.trim());
      }
    }
    maybeYieldTag();

    const commentPart = lines.slice(0, tagsFrom).join('\n');
    const update = callback(commentPart, tags) ?? commentPart;

    const rawLines = [];
    rawLines.push(...update.split('\n'));
    rawLines.push('');
    for (const {name, value} of tags) {
      rawLines.push(...`@${name} ${value ?? ''}`.split('\n'));
    }
    // Remove any instances of 3-newlines or more (these are bigger than normal paragraph breaks).
    const rawMerged = rawLines.join('\n').replace(/\n{3,}/gm, '\n\n').trim();

    // Only insert a new comment if there's something valid here. It's possible to remove comments
    // this way.
    if (rawMerged.length) {
      const out = `/**
${rawMerged.split('\n').map((line) => `${spaces}* ${line}`.trimRight()).join('\n')}
${spaces}*/`;
          parts.push(out);
    }

    index = endOfComment + 2;
  }

  return parts.join('');
}
