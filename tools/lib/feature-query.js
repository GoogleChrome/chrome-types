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
import { isDeepEqual } from './equal.js';
import { mostReleasedChannel } from './channel.js';


export class FeatureQuery {
  #feature;

  /**
   * Merges complex features as described in Chrome's source code here:
   *   https://chromium.googlesource.com/chromium/src/+/refs/heads/main/chrome/common/extensions/api/_features.md#simple-and-complex-features
   *
   * We take a relaxed approach to complex features. Most just describe two possible options for
   * permission dependencies. These are merged in the .d.ts file and left ambiguous to the reader,
   * and on http://developer.chrome.com we just present them without specific "AND" or "OR".
   *
   * If this returns `null`, then the feature is considered disallowed.
   *
   * @param {chromeTypes.FeatureSpec[]} q
   * @return {chromeTypes.FeatureSpec | null | void}
   */
  mergeComplexFeature(q) {
    /** @type {Set<string>} */
    const mergedDependencies = new Set();

    // Find all dependencies defined here, and remove some keys so we can do deep comparison.
    const compare = q.map((cand) => {
      // We also remove `default_parent` here.
      const { dependencies = [], default_parent, ...clone } = cand;
      dependencies.forEach((dep) => mergedDependencies.add(dep));
      return clone;
    });

    // If all the dependencies equal the first, then just return a single dep with the new unified
    // dependencies.
    const first = compare[0];
    const allMatch = !compare.slice(1).some((cand) => !isDeepEqual(cand, first));
    if (allMatch) {
      return {
        ...first,
        dependencies: [...mergedDependencies],
      };
    }

    // Filter (potentially) by channel. Choose the most released channel (e.g., 'stable' over 'beta').
    const bestChannel = q.reduce((channel, spec) => mostReleasedChannel(channel, spec.channel ?? "stable"), /** @type {chromeTypes.Channel | undefined} */(undefined));
    const bestChannelFilter = q.filter(({ channel }) => {
      return channel === bestChannel || (bestChannel === "stable" && !channel);
    });
    if (bestChannelFilter.length === 1) {
      return bestChannelFilter[0];
    }

    // Filter by extension (prefer).
    const extensionFilter = q.filter(({ extension_types }) => extension_types?.includes('extension'));
    if (extensionFilter.length === 1) {
      return extensionFilter[0];
    }

    // If the availability differs based on install location, use the default
    // (non policy / component extension) data.
    const locationFilter = q.filter(({ location }) => !location);
    if (locationFilter.length === 1) {
      return locationFilter[0];
    }

    // Features that are unclear here will throw.
  }

  /**
   * @param {chromeTypes.FeatureSpec} f
   * @return {boolean}
   */
  filter(f) {
    return basicFilter(f);
  }

  /**
   * @param {{[name: string]: chromeTypes.FeatureSpec|chromeTypes.FeatureSpec[]}} feature
   */
  constructor(feature) {
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

      all = all.filter((f) => this.filter(f));
      localFeature[name] = all;
    }

    this.#feature = localFeature;
  }

  /**
   * @param {string} id
   * @param {boolean=} chooseDefaultParent
   * @return {chromeTypes.FeatureSpec | null}
   */
  #flatten = (id, chooseDefaultParent = false) => {
    const all = this.#feature[id] ?? [{}];

    /** @type {chromeTypes.FeatureSpec | Null} */
    let feature = all[0] ?? null;

    if (all.length > 1) {
      if (chooseDefaultParent) {
        const defaultParent = all.find(({default_parent}) => default_parent);
        if (defaultParent) {
          return defaultParent;
        }
      }

      const update = this.mergeComplexFeature(all);
      if (update === undefined) {
        throw new Error(`could not merge complex feature data, you should update FeatureQuery.mergeComplexFeature and subclass(es): ${JSON.stringify(all)}`);
      }
      feature = update;
    }

    // We're not allowed to proceed.
    if (feature === null) {
      return null;
    }

    // If there's no parent, or this feature specifies `noparent`, then stop here.
    const parent = parentId(id);
    if (!parent || feature.noparent) {
      return feature;
    }

    // Grab the parent feature, and allow preferencing the default parent.
    // Merge the current feature with the parent we find. It wins by basic assignment: e.g.,
    // arrays aren't intelligently merged.
    const parentFeature = this.#flatten(parent, true);
    return { ...parentFeature, ...feature };
  };

  /**
   * Confirms that the specified feature is allowed and passes the given check.
   *
   * @param {string} id
   * @param {(f: chromeTypes.FeatureSpec, id: string) => boolean | void} check
   * @return {boolean}
   */
  checkFeature(id, check) {
    const f = this.#flatten(id);
    if (f === null) {
      return false;
    }

    // Ensure that our expansion passes.
    if (check(f, id) === false) {
      return false;
    }

    // Ensure that all of our dependencies pass. Dependencies are ALL, not some, so we have to
    // check all of them.
    for (const dep of f.dependencies ?? []) {
      if (this.checkFeature(dep, check) === false) {
        return false;
      }
    }

    return true;
  }

  /**
   * @param {string} id
   * @return {boolean}
   */
  isAvailable(id) {
    return this.checkFeature(id, () => true);
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

  // An API only exposed to "web_page" contexts (such as the APIs exposed to
  // the Chrome Web Store) are unlikely to be ones we want to show in the
  // documentation.
  if (f.contexts?.length === 1 && f.contexts[0] === "web_page") {
    return false;
  }

  return true;
}