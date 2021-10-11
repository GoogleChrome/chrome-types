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
import { parentId } from './traverse.js';


export class FeatureQuery {
  #feature;

  /**
   * @param {{[name: string]: chromeTypes.FeatureSpec|chromeTypes.FeatureSpec[]}} feature
   */
  constructor(feature) {
    // TODO: rewrite -list for old data

    this.#feature = feature;
  }

  /**
   * @param {string} id
   * @return {chromeTypes.FeatureSpec | chromeTypes.FeatureSpec[] | null}
   */
  #query = (id) => {
    const out = this.#feature[id];
    if (out === undefined) {
      return {};
    }

    const arr = [out].flat().filter(basicFilter);
    return arr.length > 1 ? arr : arr[0] ?? null;
  };

  /**
   * @param {string} id
   * @return {boolean}
   */
  availableInExtensions(id) {
    const original = id;

    /** @type {(f: chromeTypes.FeatureSpec?) => boolean} */
    const check = (f) => {
      return f && (!f.extension_types || f.extension_types.includes('extension')) || false;
    };


    while (id) {
      let q = this.#query(id);
      if (q === null) {
        return false;
      }

      // Find the defaultParent (or just the feature, if there's only one).
      const defaultParent = Array.isArray(q) ? q.find(({ default_parent }) => default_parent) ?? null : q;
      if (defaultParent) {
        q = defaultParent;
      }

      if (Array.isArray(q)) {
        // TODO: possible multiple allows (?)
        const allowed = q.find(check);
        if (!allowed) {
          return false;
        }

        const allowedAll = q.filter(check);
        if (allowedAll.length !== 1) {
          console.warn('got many allowed', { id, original }, allowedAll);
        }

        q = allowed;
      } else if (!check(q)) {
        return false;
      }

      if (q.dependencies?.length) {
        for (const dep of q.dependencies) {
          if (!this.availableInExtensions(dep)) {
            return false;
          }
        }
      }

      if (q.noparent) {
        return false;
      }

      id = parentId(id);
    }

    return true;
  }

}


/**
 * @param {chromeTypes.FeatureSpec} f
 * @return {boolean}
 */
function basicFilter(f) {
  // This feature is limited to specific IDs.
  if (f.allowlist?.length) {
    return false;
  }

  // This is still in development.
  if (f.command_line_switch) {
    return false;
  }

  // TODO(samthor): This disallows the Platform Apps APIs "virtualKeyboard" and "networking.onc",
  // which are still documented on the site. Both APIs document their kiosk-only state in their
  // description so we don't have to make further noise about them.
  // Only allow regular, not "kiosk".
  if (f.session_types?.length && !f.session_types.includes('regular')) {
    return false;
  }

  // Only allow matching all URLs.
  if (f.matches?.length && !f.matches.includes('<all_urls>')) {
    return false;
  }

  // Only allow a limited set of extension types.
  if (Array.isArray(f.extension_types)) {
    /** @type {chromeTypes.ExtensionType[]} */
    const allowedTypes = ['extension', 'platform_app'];
    const ok = allowedTypes.some((check) => f.extension_types?.includes(check));
    if (!ok) {
      return false;
    }
  }

  return true;
}