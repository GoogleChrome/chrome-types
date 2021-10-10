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
 * @fileoverview This file contains helpers used to override various types from Chromium source.
 *
 * It's run on all versions, even historic ones, so we can't remove historic hacks if they're
 * eventually fixed.
 *
 * TODO(samthor): These are all static top-level methods; this could instead be an object we
 * instantiate based on Chrome version.
 */


import * as chromeTypes from '../../types/chrome.js';


/**
 * Is this type visible by default?
 *
 * @param {chromeTypes.TypeSpec} spec
 * @param {string} id
 * @return {boolean}
 */
export function isVisible(spec, id) {
  switch (id) {
    case 'api:declarativeContent.ShowAction':
      // This is incorrectly referenced even though it's marked nodoc.
      return true;
  }
  return !spec.nodoc;
}


/**
 * These are the template overrides for interface definitions within Chrome's extensions codebase.
 *
 * Chrome has no way of specifying that a type might be templated, so this doesn't upgrade a
 * passed "spec".
 *
 * @param {string} id
 */
export function objectTemplatesFor(id) {
  switch (id) {
    case 'api:events.Event':
      return 'H, C = void, A = void';

    case 'api:events.Rule':
      return 'C = any, A = any';

    case 'api:contentSettings.ContentSetting':
      return 'T';

    case 'api:types.ChromeSetting':
      return 'T';
  }
}


/**
 * Optionally do a complete type replacement or upgrade prior to render.
 *
 * @param {chromeTypes.TypeSpec} spec
 * @param {string} id
 * @return {chromeTypes.TypeSpec|undefined}
 */
export function typeOverride(spec, id) {

  // Replace callback types to do with Event.
  switch (id) {
    case 'api:events.Event.addListener.callback':
    case 'api:events.Event.removeListener.callback':
    case 'api:events.Event.hasListener.callback':
      return { $ref: 'H' };

    case 'api:events.Event.addRules.rules._':
    case 'api:events.Event.addRules.callback.rules._':
    case 'api:events.Event.getRules.callback.rules._':
      return { $ref: 'Rule', value: ['', { $ref: 'C' }, { $ref: 'A' }] };
  }

  // Fix isInstanceOf usages.
  switch (spec.isInstanceOf) {
    case 'Promise':
      return { $ref: 'Promise', value: ['', { type: 'any' }] };

    case 'global':
      return { $ref: 'Window' };
  }

  // Upgrade ambiguous "any" to better template types as needed.
  if (spec.type === 'any') {
    switch (id) {
      case 'api:events.Rule.conditions._':
        return { $ref: 'C' };

      case 'api:events.Rule.actions._':
        return { $ref: 'A' };

      case 'api:contentSettings.ContentSetting.get.return.setting':
      case 'api:contentSettings.ContentSetting.get.callback.details.setting':
      case 'api:types.ChromeSetting.set.details.setting':
        return { $ref: 'T' };

      case 'api:types.ChromeSetting.onChange.details.value':
      case 'api:types.ChromeSetting.get.return.value':
      case 'api:types.ChromeSetting.get.callback.details.value':
      case 'api:types.ChromeSetting.set.details.value':
        return { $ref: 'T' };
    }
  }

}