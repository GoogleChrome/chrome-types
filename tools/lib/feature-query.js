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
   * @param {(f: chromeTypes.FeatureSpec) => boolean} extraFilter
   */
  constructor(feature, extraFilter = () => true) {
    /** @type {{[name: string]: chromeTypes.FeatureSpec[]}} */
    const localFeature = {};

    for (const [name, raw] of Object.entries(feature)) {
      let all = [raw].flat();
      all.forEach((f) => {
        // This rewrites historic names for "allowlist" and "blocklist", which appear in historic
        // versions of the Chrome source code.
        const m = {'white': 'allow', 'black': 'block'};
        for (const key in m) {
          const prev = f[key + 'list'];
          if (!prev) {
            continue;
          }
          delete f[key + 'list'];
          const update = m[key] + 'list';
          f[update] = prev;
        }
      });

      all = all.filter((f) => {
        return basicFilter(f) && extraFilter(f);
      });

      localFeature[name] = all;
    }

    this.#feature = localFeature;
  }

  /**
   * @param {string} id
   * @return {chromeTypes.FeatureSpec[]}
   */
  #flatten = (id) => {
    const q = this.#feature[id] ?? [{}];

    const parent = parentId(id);
    if (!parent) {
      // Even though q might be a list of many, we don't filter by default_parent here.
      // Direct calls to #flatten should return both options, since it's not a parent request.
      return q;
    }

    return q.map((feature) => {
      if (feature.noparent) {
        return feature;  // we stop here
      }

      const parents = this.#flatten(parent);

      // If the parents have a default, choose that.
      const defaultParent = parents.find(({default_parent}) => default_parent);
      if (defaultParent) {
        parents.splice(0, parents.length, defaultParent);
      }

      return parents.map((p) => {
        // Merge the current feature with the parent we find. It wins by basic assignment: e.g.,
        // arrays aren't intelligently merged.
        return { ...p, ...feature };
      });

    }).flat();
  };

  /**
   * Confirms that at least one expansions in the heirarchy passes the given check.
   *
   * @param {string} id
   * @param {(f: chromeTypes.FeatureSpec) => boolean} check
   * @return {boolean}
   */
  someFeature(id, check) {
    const flat = this.#flatten(id);

    // Ensure that at least one of our expansions pass.
    // If that is empty, this will return false, which is correct: we were filtered out for basic
    // reasons (e.g., feature is behind a flag).
    return flat.some((opt) => {
      if (!check(opt)) {
        return false;
      }

      // Ensure that all of our dependencies pass. Dependencies are ALL, not some, so we have to
      // check all of them.
      for (const dep of opt.dependencies ?? []) {
        if (!this.someFeature(dep, check)) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * @param {string} id
   * @return {boolean}
   */
  isAvailable(id) {
    return this.someFeature(id, () => true);
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

  // Only allow regular, not "kiosk".
  if (f.session_types?.length && !f.session_types.includes('regular')) {
    // HACK: we don't disallow this for now as it only lets through the Platform Apps APIs:
    //   * 'virtualKeyboard'
    //   * 'networking.onc'
    // ...both which are deprecated, but might still be used.
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