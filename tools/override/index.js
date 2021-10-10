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
 * Potentially replace a found 'any' with a better type.
 *
 * @param {string} id
 * @return {string|undefined}
 */
export function replaceAnyWith(id) {
  switch (id) {
    case 'api:events.Rule.conditions._':
      return 'C';

    case 'api:events.Rule.actions._':
      return 'A';

    case 'api:contentSettings.ContentSetting.get.return.setting':
    case 'api:contentSettings.ContentSetting.get.callback.details.setting':
    case 'api:types.ChromeSetting.set.details.setting':
      return 'T';

    case 'api:types.ChromeSetting.onChange.details.value':
    case 'api:types.ChromeSetting.get.return.value':
    case 'api:types.ChromeSetting.get.callback.details.value':
    case 'api:types.ChromeSetting.set.details.value':
      return 'T';
  }
}


/**
 * Potentially do a complete type replacement or upgrade.
 *
 * @param {chromeTypes.TypeSpec} spec
 * @param {string} id
 */
export function typeOverride(spec, id) {
  switch (id) {
    case 'api:events.Event.addListener.callback':
    case 'api:events.Event.removeListener.callback':
    case 'api:events.Event.hasListener.callback':
      return { $ref: 'H' };

    case 'api:events.Event.addRules.rules._':
    case 'api:events.Event.addRules.callback.rules._':
    case 'api:events.Event.getRules.callback.rules._':
      return { $ref: 'Rule', value: [ '', { $ref: 'C' }, { $ref: 'A' } ] };
  }

  switch (spec.isInstanceOf) {
    case 'Promise':
      return { $ref: 'Promise', value: [ '', { type: 'any' }]};

    case 'global':
      return { $ref: 'Window' };
  }
}