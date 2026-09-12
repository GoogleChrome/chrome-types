/**
 * Copyright 2026 Google LLC
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

import * as fs from 'fs';
import * as chromeTypes from '../../types/chrome.js';
import { RenderBuffer } from './buffer.js';
import { isValidToken } from './js-internals.js';
import { RenderContext } from './render-context.js';


export const roots = ['chrome', 'browser'];

/**
 * The earliest release a browser.* name can carry. Only an extension with a devtools_page can use
 * the devtools APIs, and those extensions got the browser global later. An API added after that
 * keeps its own @since.
 *
 * @param {string} id
 * @return {number}
 */
function browserSinceFloor(id) {
  return id.startsWith('api:devtools') ? 152 : 148;
}


/**
 * Renders the preamble and the API bundle under the given root. A browser bundle also gets a
 * chrome namespace that re-exports every API.
 *
 * @param {chromeTypes.NamespaceSpec[]} apis
 * @param {RenderContext} renderContext
 * @param {{root: string}} options
 * @return {string[]}
 */
export function renderNamespaceBundle(apis, renderContext, { root }) {
  if (!roots.includes(root)) {
    throw new Error(`unknown root: ${root}`);
  }

  // The preamble refers to chrome.events.Event. That still resolves under the browser root,
  // because the chrome namespace rendered below re-exports events.
  const preambleFile = new URL('../../content/preamble.d.ts', import.meta.url);
  const preamble = fs.readFileSync(preambleFile, 'utf-8');

  if (root === 'chrome') {
    return [preamble, renderContext.renderRoot(apis, root).out];
  }

  const { out, namespaces } = renderContext.renderRoot(apis, root, {
    exportKeywordNames: true,
    sinceFloor: browserSinceFloor,
  });

  const description = 'The WebExtensions namespace. Chrome exposes the Manifest V3 extension APIs here as well as under chrome, from Chrome 152 for extensions with a devtools_page.';
  const note = 'Here `@since` is the release the browser name became available and `@chrome-ns-since` the release the API arrived under chrome.';
  const header = new RenderBuffer();
  header.comment(`${description}\n\n${note}`, [{ name: 'since', value: 'Chrome 148' }]);
  header.line();
  header.append(out);

  return [preamble, header.render(true).trimStart(), renderChromeCompat(namespaces, renderContext)];
}


/**
 * @param {chromeTypes.NamespaceSpec[]} namespaces namespaces rendered under browser
 * @param {RenderContext} renderContext
 * @return {string}
 */
function renderChromeCompat(namespaces, renderContext) {
  const buf = new RenderBuffer();
  buf.start('declare namespace chrome {');

  for (const namespace of namespaces) {
    const { namespace: name } = namespace;
    const from = `browser.${isValidToken(name) ? name : `_${name}`}`;
    const note = `Prefer browser.${name}. This name is the same API and remains supported.`;
    buf.append(renderContext.renderAliasNamespace(namespace, from, note));
  }

  buf.end('}');
  buf.line();
  return buf.render(true).trimStart();
}
