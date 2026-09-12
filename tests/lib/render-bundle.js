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


// `idle` has no members, so it renders nothing and must not be aliased.
/** @type {chromeTypes.NamespaceSpec[]} */
const apis = [
  {
    namespace: 'alarms',
    description: 'Schedule code to run periodically.',
    types: [{ id: 'Alarm', type: 'object', properties: { name: { type: 'string' } } }],
    properties: { MAX: { type: 'integer', value: 5 } },
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
    functions: [
      { name: 'attach', type: 'function', parameters: [{ name: 'target', type: 'string' }] },
      { name: 'delete', type: 'function', parameters: [] },
    ],
  },
  {
    namespace: 'devtools.inspectedWindow',
    functions: [{ name: 'eval', type: 'function', parameters: [{ name: 'expression', type: 'string' }] }],
  },
  {
    namespace: 'dns',
    functions: [{ name: 'resolve', type: 'function', parameters: [{ name: 'hostname', type: 'string' }] }],
  },
  {
    namespace: 'idle',
  },
];

const history = {
  generated: '',
  high: 150,
  low: 1,
  revision: 0,
  symbols: {
    'api:alarms': { low: 88, high: 150 },
    'api:alarms.clear': { low: 90, high: 150 },
    'api:alarms.clear.return': { low: 91, high: 150 },
    'api:debugger': { low: 150, high: 150 },
    'api:devtools.inspectedWindow': { low: 100, high: 150 },
  },
};

const rc = new RenderContext(new RenderOverride({}, new FeatureQuery({
  'api:dns': { channel: 'dev' },
}), history));


test('browser root', t => {
  const [preamble, body] = renderNamespaceBundle(apis, rc, { root: 'browser' });

  t.true(preamble.includes('chrome.events.Event'));
  t.is(body, `/**
 * The WebExtensions namespace. Extensions with a devtools_page get it from Chrome 152.
 *
 * @since Chrome 148
 */
declare namespace browser {

  /**
   * Schedule code to run periodically.
   *
   * @since Chrome 148
   * @chrome-namespace-since Chrome 88
   */
  export namespace alarms {

    /**
     * @since Pending
     */
    export interface Alarm {

      name: string;
    }

    /**
     * @since Pending
     */
    export const MAX: 5;

    /**
     * Clears an alarm.
     *
     * @chrome-returns-extra since Chrome 148
     * @chrome-returns-extra chrome-namespace-since Chrome 91
     * @since Chrome 148
     * @chrome-namespace-since Chrome 90
     */
    export function clear(): Promise<boolean>;

    /**
     * Clears an alarm.
     *
     * @since Chrome 148
     * @chrome-namespace-since Chrome 90
     */
    export function clear(

      /**
       * @since Pending
       */
      callback?: (
        wasCleared: boolean,
      ) => void,
    ): void;
  }

  /**
   * @since Chrome 150
   * @chrome-namespace-since Chrome 150
   */
  export namespace _debugger {

    /**
     * @since Pending
     */
    export function attach(

      target: string,
    ): void;

    export {_delete as delete};

    /**
     * @since Pending
     */
    export function _delete(): void;
  }
  export {_debugger as debugger};

  /**
   * @since Chrome 152
   * @chrome-namespace-since Chrome 100
   */
  export namespace devtools.inspectedWindow {

    export {_eval as eval};

    /**
     * @since Pending
     */
    export function _eval(

      expression: string,
    ): void;
  }

  /**
   * @alpha
   * @chrome-channel dev
   */
  export namespace dns {

    export function resolve(

      hostname: string,
    ): void;
  }
}
`);
});


test('chrome compat', t => {
  const compat = renderNamespaceBundle(apis, rc, { root: 'browser' })[2];

  t.is(compat, `declare namespace chrome {

  /**
   * Schedule code to run periodically.
   *
   * Alias of browser.alarms.
   *
   * @since Chrome 88
   */
  export namespace alarms {

    /**
     * @since Pending
     */
    export import Alarm = browser.alarms.Alarm;

    /**
     * @since Pending
     */
    export import MAX = browser.alarms.MAX;

    /**
     * Clears an alarm.
     *
     * @chrome-returns-extra since Chrome 91
     * @since Chrome 90
     */
    export import clear = browser.alarms.clear;
  }

  /**
   * Alias of browser.debugger.
   *
   * @since Chrome 150
   */
  export namespace _debugger {

    /**
     * @since Pending
     */
    export import attach = browser._debugger.attach;

    /**
     * @since Pending
     */
    import _delete = browser._debugger._delete;
    export {_delete as delete};
  }
  export {_debugger as debugger};

  /**
   * Alias of browser.devtools.inspectedWindow.
   *
   * @since Chrome 100
   */
  export namespace devtools.inspectedWindow {

    /**
     * @since Pending
     */
    import _eval = browser.devtools.inspectedWindow._eval;
    export {_eval as eval};
  }

  /**
   * Alias of browser.dns.
   *
   * @alpha
   * @chrome-channel dev
   */
  export namespace dns {

    export import resolve = browser.dns.resolve;
  }
}
`);
});


test('chrome root', t => {
  const parts = renderNamespaceBundle(apis, rc, { root: 'chrome' });

  t.is(parts.length, 2);
  t.is(parts[1], `declare namespace chrome {

  /**
   * Schedule code to run periodically.
   *
   * @since Chrome 88
   */
  export namespace alarms {

    /**
     * @since Pending
     */
    export interface Alarm {

      name: string;
    }

    /**
     * @since Pending
     */
    export const MAX: 5;

    /**
     * Clears an alarm.
     *
     * @chrome-returns-extra since Chrome 91
     * @since Chrome 90
     */
    export function clear(): Promise<boolean>;

    /**
     * Clears an alarm.
     *
     * @since Chrome 90
     */
    export function clear(

      /**
       * @since Pending
       */
      callback?: (
        wasCleared: boolean,
      ) => void,
    ): void;
  }

  /**
   * @since Chrome 150
   */
  namespace _debugger {

    /**
     * @since Pending
     */
    export function attach(

      target: string,
    ): void;

    export {_delete as delete};

    /**
     * @since Pending
     */
    function _delete(): void;
  }
  export {_debugger as debugger};

  /**
   * @since Chrome 100
   */
  export namespace devtools.inspectedWindow {

    export {_eval as eval};

    /**
     * @since Pending
     */
    function _eval(

      expression: string,
    ): void;
  }

  /**
   * @alpha
   * @chrome-channel dev
   */
  export namespace dns {

    export function resolve(

      hostname: string,
    ): void;
  }
}
`);
});


test('namespace shadowing the root', t => {
  // chrome.browser.openTab is a real API.
  const shadowing = [...apis, { namespace: 'browser', functions: [{ name: 'openTab', type: 'function', parameters: [] }] }];

  t.throws(() => renderNamespaceBundle(shadowing, rc, { root: 'browser' }));
  t.notThrows(() => renderNamespaceBundle(shadowing, rc, { root: 'chrome' }));
});


test('no history', t => {
  const bare = new RenderContext(new RenderOverride({}, new FeatureQuery({}), null));
  const [, body] = renderNamespaceBundle(apis, bare, { root: 'browser' });

  // There is no release data, so a namespace's age is unknown.
  t.is(body.split('* @since ').length - 1, 1);
  t.true(body.includes(' * @since Chrome 148\n */\ndeclare namespace browser {'));
});
