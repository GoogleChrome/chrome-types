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

import {posix as path} from 'path';
import {rewriteCommentHrefs} from './comment.js';


/**
 * These prefixes were used as the left-most component of a suffix to indicate that this actually
 * points at a real type. (Notably, on the 2012-2020 site, these often didn't resolve for complex
 * types).
 */
const historicResolvedPrefixes = ['type', 'event', 'property', 'type'];


/**
 * @param {string} namespaceName
 * @param {string[]} allNamespaceNames
 * @return {(raw: string) => string}
 */
export function buildNamespaceAwareRewrite(namespaceName, allNamespaceNames) {
  const nonceName = `__${Math.random().toString(16)}`;
  const resolveHref = (href) => {
    // This base URL is important: most of the old site's pages were relative to this URL.
    const u = new URL(href, 'https://developer.chrome.com/extensions/' + nonceName);
    if (u.protocol === 'http:') {
      // Force all links to https:.
      u.protocol = 'https:';
    } else if (u.protocol !== 'https:') {
      return href; // not sure what this is
    }

    // Save us if someone has accidentally entered the plural domain.
    if (u.hostname === 'developers.chrome.com') {
      u.hostname = 'developer.chrome.com';
    }

    // This is an external link. Ignore it.
    if (u.hostname !== 'developer.chrome.com') {
      return u.toString();
    }

    // Strip any trailing .html; they existed only in the old site.
    u.pathname = u.pathname.replace(/\.html$/, '');

    /** @type {string} */
    let resolvedNamespaceName;

    if (path.basename(u.pathname) === nonceName) {
      resolvedNamespaceName = namespaceName;
    } else {
      // Match an absolute URL under e.g., "/docs/extensions/" or "/apps/foo/.
      const extensionsUrlRe = /^\/(?:docs\/)?(extensions|apps)\/([.a-zA-Z0-9_\/]*)$/;
      const m = extensionsUrlRe.exec(u.pathname);
      if (!m) {
        // We didn't match a URL that might possibly be a namespace. Return blind and hope the
        // redirects can work it out.
        return u.toString();
      }

      const extensionOrApps = m[1];
      const suffix = m[2];

      resolvedNamespaceName = suffix.replace(/_/g, '.');
      if (!allNamespaceNames.includes(resolvedNamespaceName)) {
        u.pathname = `/docs/${extensionOrApps}/${suffix}`;
        return u.toString();
      }
    }

    // Without a hash, this will be a direct @link to the namespace.
    if (!u.hash) {
      return resolvedNamespaceName;
    }

    // With a hash, this could either be a type reference, or a # to something on its page.
    const parts = u.hash.substr(1).split('-');
    if (historicResolvedPrefixes.includes(parts[0])) {
      parts.shift();
      if (namespaceName !== resolvedNamespaceName) {
        parts.unshift(resolvedNamespaceName);
      }
      return parts.join('.');
    }

    // It didn't look like a type, so just return a real URL.
    return `https://developer.chrome.com/docs/extensions/reference/${resolvedNamespaceName}/${u.hash}`;
  };

  return (raw) => {
    // TODO(samthor): This could really do with a HTML-to-Markdown converter.

    raw = raw.replace(/<p>/g, '\n\n');
    raw = raw.replace(/<\/p>/g, '');
    raw = raw.replace(/<ul>/g, '\n\n<ul>\n');
    raw = raw.replace(/<\/ul>/g, '\n</ul>\n\n');

    // This is particularly special. For some unknown reason, code samples (only in Apps docs) use
    // \n for separation but \r for actual newlines.
    raw = raw.replace(/<pre>(.*?)<\/pre>/gs, (_, inner) => {
      // 
      const code = inner.replace(/\n/g, ' ').replace(/\r/g, '\n');
      return `

\`\`\`js
${code}
\`\`\`
`;
    });

    if (raw.includes('<pre>')) {
      throw new Error(`got spurious <pre>: ${raw}`)
    }

    // Some of the old Platform Apps code incorrectly includes this tag verbatim.
    raw = raw.replace(/<webview>/g, '<code>webview</code>');

    raw = raw.replace(/\|(\w+)\|/g, (_, part) => {
      return `<code>${part}</code>`;
    });

    return rewriteCommentHrefs(raw, resolveHref);
  };
}