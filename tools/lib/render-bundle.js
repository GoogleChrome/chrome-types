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
import { RenderContext } from './render-context.js';


export const roots = ['chrome', 'browser'];

/**
 * Finds the oldest `@since` a `browser.*` name can claim. `browser` arrived in 148, and in 152
 * for extensions with a devtools_page.
 *
 * @param {string} id
 * @return {number}
 */
function browserSinceFloor(id) {
  return id.startsWith('api:devtools') ? 152 : 148;
}


/**
 * Renders the preamble and the API bundle under the given root. A browser root also renders a
 * chrome namespace of aliases.
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

  // The preamble names `chrome.events.Event`, which resolves under the browser root too, since
  // renderChromeCompat aliases `events` along with everything else.
  const preambleFile = new URL('../../content/preamble.d.ts', import.meta.url);
  const preamble = fs.readFileSync(preambleFile, 'utf-8');

  if (root === 'chrome') {
    return [preamble, renderContext.renderRoot(apis, root).out];
  }

  const { out, namespaces } = renderContext.renderRoot(apis, root, {
    exportKeywordNames: true,
    sinceFloor: browserSinceFloor,
  });

  const description = 'The WebExtensions namespace. Extensions with a devtools_page get it from Chrome 152.';
  const header = new RenderBuffer();
  header.comment(description, [{ name: 'since', value: 'Chrome 148' }]);
  header.line();
  header.append(out);

  return [preamble, header.render(true).trimStart(), renderChromeCompat(namespaces, renderContext)];
}


/**
 * Renders the chrome namespace, keeping every API reachable under its original name.
 *
 * @param {chromeTypes.NamespaceSpec[]} namespaces the namespaces that rendered under browser
 * @param {RenderContext} renderContext
 * @return {string}
 */
function renderChromeCompat(namespaces, renderContext) {
  const buf = new RenderBuffer();
  buf.start('declare namespace chrome {');

  for (const namespace of namespaces) {
    // An API called browser would be declared beside these aliases and shadow the root itself.
    if (namespace.namespace.split('.')[0] === 'browser') {
      throw new Error(`namespace shadows the browser root: ${namespace.namespace}`);
    }
    const note = `Alias of browser.${namespace.namespace}.`;
    buf.append(renderContext.renderAliasNamespace(namespace, 'browser', note));
  }

  buf.end('}');
  buf.line();
  return buf.render(true).trimStart();
}
