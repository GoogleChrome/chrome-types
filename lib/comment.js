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

import {posix as path} from 'path';
import TurndownService from 'turndown';


// Matches the standard "$(ref:foo notes)" case.
const dollarRefRegexp = /\$\(ref:(.*?)\)/g;

// Matches some non-standard "ref:" cases.
const invalidDollarRefRegexp = /\$ref:?([\w\.]*\w|\(\S+\))/g;

// Matches variables like "|foo|".
const pipeSymbolRegexp = /\|([\w\.]+)\|/g;


/**
 * @return {(raw: string) => string}
 */
function buildTurndownRunner() {
  const linkRegexp = /{@link.+?}/gs;

  const turndownService = new TurndownService({
    headingStyle: 'atx',
  });
  const originalEscape = turndownService.escape.bind(turndownService);

  /**
   * Replaces turndown's escape function with one that ignores the contents of "{@link ...}" blocks.
   *
   * @param {string} text
   */
  turndownService.escape = function(text) {
    /** @type {string[]} */
    const parts = [];
  
    for (;;) {
      linkRegexp.lastIndex = -1;
      const match = linkRegexp.exec(text);
      if (!match) {
        parts.push(text);
        break;
      }
      parts.push(text.substr(0, match.index));
      parts.push(match[0]);
  
      text = text.substr(match.index + match[0].length);  // move past matched regexp
     } 
  
    for (let i = 0; i < parts.length; ++i) {
      if ((i % 2) === 0) {
        parts[i] = originalEscape(parts[i]);
      }
    }
  
    return parts.join('');
  };

  return (text) => turndownService.turndown(text);
}


const turndownRunner = buildTurndownRunner();


/**
 * These prefixes were used as the left-most component of a suffix to indicate that this actually
 * points at a real type. (Notably, on the 2012-2020 site, these often didn't resolve for complex
 * types).
 */
const historicResolvedPrefixes = ['type', 'event', 'property', 'type'];



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
 * @return {boolean} is this probably a URL?
 */
function isUrl(raw) {
  try {
    new URL(raw);
    return true;
  } catch (e) {
    return false;
  }
}


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
 * @param {string} namespaceName the current namespace
 * @param {(namespaceName: string) => boolean} isNamespace is this other string a namespace?
 * @param {string} href to resolve
 * @return {string} if URL, creates `<a href="...">`: otherwise, converts to `{\@link}`
 */
const resolveHref = (namespaceName, isNamespace, href) => {
  const nonceName = `__${Math.random().toString(16)}`;

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
    if (!isNamespace(resolvedNamespaceName)) {
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


/**
 * @param {string[]} allNamespaceNames
 * @return {(namespace: string, raw: string) => string}
 */
export function buildNamespaceAwareMarkdownRewrite(allNamespaceNames) {
  const s = new Set(allNamespaceNames);
  const isNamespace = s.has.bind(s);

  /**
   * @param {string} namespaceName
   * @param {string} raw
   * @return {string}
   */
  return (namespaceName, raw) => {
    raw = raw.replace(invalidDollarRefRegexp, (_, group) => {
      if (group.startsWith('(') && group.endsWith(')')) {
        group = group.substring(0, group.length - 1);
      }
      return `$(ref:${group})`;
    });

    raw = raw.replace(dollarRefRegexp, (_, group) => {
      return `{@link ${group}}`;
    });

    // Match e.g., "blah |foo.bar| hello" and include the pipe denoted variable in code.
    raw = raw.replace(pipeSymbolRegexp, (_, group) => {
      return `<code>${group}</code>`;
    });

    raw = rewriteCommentHrefs(raw, (href) => resolveHref(namespaceName, isNamespace, href));

    // TODO(samthor): There's a bit of markdown-like code inside the JSON which will likely be
    // eaten by Turndown, but the benefits right now outweight the weird outputs, and a lot of the
    // weird cases exist in Platform Apps which we no longer publish.
    return turndownRunner(raw);
  };
}


/**
 * Reformats the given comment, removing trailing space and wrapping comment lines.
 *
 * @param {string} raw
 * @return {string}
 */
export function reformatDTSFile(raw) {
  const stripped = raw.split('\n').map((line) => line.trimRight()).join('\n');

  // TODO(samthor): This doesn't wrap comment lines yet.

  return stripped;
}
