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

import test from 'ava';
import { renderNamespaceBundle } from '../../tools/lib/render-bundle.js';
import { RenderContext } from '../../tools/lib/render-context.js';
import { FeatureQuery } from '../../tools/lib/feature-query.js';
import { RenderOverride } from '../../tools/override.js';
import * as chromeTypes from '../../types/chrome.js';


/** @type {chromeTypes.NamespaceSpec[]} */
const apis = [
  {
    namespace: 'alarms',
    description: 'Schedule code to run periodically.',
    functions: [{
      name: 'clear',
      type: 'function',
      description: 'Clears an alarm.',
      parameters: [],
      returns_async: { name: 'callback', parameters: [{ name: 'wasCleared', type: 'boolean' }] },
    }],
  },
  {
    namespace: 'debugger',
    functions: [{ name: 'attach', type: 'function', parameters: [{ name: 'target', type: 'string' }] }],
  },
  {
    namespace: 'dns',
    functions: [{ name: 'resolve', type: 'function', parameters: [{ name: 'hostname', type: 'string' }] }],
  },
  {
    namespace: 'devtools.inspectedWindow',
    functions: [{ name: 'eval', type: 'function', parameters: [{ name: 'expression', type: 'string' }] }],
  },
];

const history = {
  generated: '',
  high: 150,
  low: 3,
  revision: 0,
  symbols: {
    'api:alarms': { low: 22, high: 150 },
    'api:alarms.clear': { low: 90, high: 150 },
    'api:alarms.clear.return': { low: 91, high: 150 },
    'api:alarms.clear.callback': { low: 90, high: 150 },
    'api:alarms.clear.callback.wasCleared': { low: 90, high: 150 },
    'api:debugger': { low: 150, high: 150 },
    'api:debugger.attach': { low: 150, high: 150 },
    'api:devtools.inspectedWindow': { low: 100, high: 150 },
    'api:devtools.inspectedWindow.eval': { low: 101, high: 150 },
  },
};

const rc = new RenderContext(new RenderOverride({}, new FeatureQuery({
  'api:dns': { channel: 'dev' },
}), history));


test('browser root', t => {
  const [preamble, body, compat] = renderNamespaceBundle(apis, rc, { root: 'browser' });

  t.true(preamble.includes('chrome.events.Event'));
  t.true(body.includes(' * @since Chrome 148\n */\ndeclare namespace browser {'));
  t.true(body.includes('   * @since Chrome 148\n   * @chrome-ns-since Chrome 22\n   */\n  export namespace alarms {'));
  t.true(body.includes('     * @chrome-returns-extra since Chrome 148\n     * @chrome-returns-extra chrome-ns-since Chrome 91\n     * @since Chrome 148\n     * @chrome-ns-since Chrome 90\n     */\n    export function clear('));
  t.true(body.includes('   * @since Chrome 150\n   * @chrome-ns-since Chrome 150\n   */\n  export namespace _debugger {'));
  t.true(body.includes('   * @since Chrome 152\n   * @chrome-ns-since Chrome 100\n   */\n  export namespace devtools.inspectedWindow {'));
  t.true(body.includes('    export {_eval as eval};'));
  t.true(body.includes('     * @since Chrome 152\n     * @chrome-ns-since Chrome 101\n     */\n    export function _eval('));
  // A dev-channel namespace has no since under chrome, so none is invented under browser.
  t.true(body.includes('   * @chrome-channel dev\n   */\n  export namespace dns {'));
  t.true(compat.startsWith('declare namespace chrome {'));
  t.true(compat.includes('  export namespace alarms {\n'));
  t.true(compat.includes('    export import clear = browser.alarms.clear;'));
  t.true(compat.includes('  export namespace _debugger {\n'));
  t.true(compat.includes('    export import attach = browser._debugger.attach;'));
  t.true(compat.includes('  }\n  export {_debugger as debugger};'));
  t.true(compat.includes('    import _eval = browser.devtools.inspectedWindow._eval;\n    export {_eval as eval};'));
  t.false(compat.includes('chrome-ns-since'));
});

test('alias comments', t => {
  const compat = renderNamespaceBundle(apis, rc, { root: 'browser' })[2];

  t.true(compat.includes(
    '  /**\n' +
    '   * Schedule code to run periodically.\n' +
    '   *\n' +
    '   * Prefer browser.alarms. This name is the same API and remains supported.\n' +
    '   *\n' +
    '   * @since Chrome 22\n' +
    '   */\n' +
    '  export namespace alarms {'
  ));
  t.true(compat.includes(
    '    /**\n' +
    '     * Clears an alarm.\n' +
    '     *\n' +
    '     * @chrome-returns-extra since Chrome 91\n' +
    '     * @since Chrome 90\n' +
    '     */\n' +
    '    export import clear = browser.alarms.clear;'
  ));
});

test('chrome root', t => {
  const parts = renderNamespaceBundle(apis, rc, { root: 'chrome' });

  t.is(parts.length, 2);
  t.true(parts[1].startsWith('declare namespace chrome {'));
  t.false(parts[1].includes('browser'));
  t.true(parts[1].includes('   * @since Chrome 22\n   */\n  export namespace alarms {'));
  t.false(parts[1].includes('chrome-ns-since'));
  // _all.d.ts feeds developer.chrome.com, so its shape does not change.
  t.true(parts[1].includes('\n  namespace _debugger {'));
});

test('no history', t => {
  const bare = new RenderContext(new RenderOverride({}, new FeatureQuery({}), null));
  const [, body] = renderNamespaceBundle(apis, bare, { root: 'browser' });

  // There is no history, so no since tag can be invented.
  t.is(body.split('* @since ').length - 1, 1);
  t.true(body.includes(' * @since Chrome 148\n */\ndeclare namespace browser {'));
});

test('unknown root', t => {
  t.throws(() => renderNamespaceBundle(apis, rc, { root: 'window' }));
});
