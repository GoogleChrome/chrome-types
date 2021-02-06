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

import * as fs from 'fs';
import * as path from 'path';
import JSON5 from 'json5';
import * as featureTypes from '../types/feature.js';
import {parentFeatureName, RestrictSet} from './features-helpers.js';


/**
 * Matches feature files.
 */
const featureNameRegexp = /^_(\w+)_features\.json$/;


/**
 * Defines the channel availability ordering. Earlier values imply availability in later ones.
 *
 * @type {featureTypes.Channel[]}
 */
const channelOrdering = ['stable', 'beta', 'dev', 'canary', 'trunk'];


class FeatureTest {
  #raw;

  /**
   * @param {featureTypes.FeatureFile} raw
   */
  constructor(raw) {
    this.#raw = raw;
  }

  /**
   * Looks up the `default_parent` feature (or the only) feature for this name.
   *
   * @param {string} name
   * @return {featureTypes.Feature}
   */
  #defaultFeature = (name) => {
    const base = [this.#raw[name] ?? []].flat();
    if (base.length === 0) {
      return {};
    } else if (base.length === 1) {
      return base[0];
    }
    const defaultFeature = base.find((cand) => cand.default_parent);
    if (!defaultFeature) {
      throw new Error(`could not find default_parent feature for: ${name}`);
    }
    return defaultFeature;
  };

  /**
   * Looks up the feature with the given name, merging all possible options (for complex features)
   * with their parents.
   *
   * @param {string} name
   * @return {featureTypes.Feature[]}
   */
  #flat = (name) => {
    const base = [this.#raw[name] ?? []].flat();
    if (!base.length) {
      base.push({});
    }

    for (;;) {
      name = parentFeatureName(name);
      if (!name) {
        break;
      }
      const feature = this.#defaultFeature(name);

      for (let i = 0; i < base.length; ++i) {
        base[i] = Object.assign({}, feature, base[i]);
      }
    }

    return base;
  };

  /**
   * Return all APIs that are features, not permissions or etc.
   *
   * @return {string[]}
   */
  allApis() {
    return Object.keys(this.#raw).filter((x) => x.startsWith('api:'));
  }

  /**
   * @param {featureTypes.IdFeature[]} run
   * @return {featureTypes.FlatFeature=}
   */
  #test = (run) => {
    let componentExtensionsAutoGranted = true;
    let disallowForServiceWorkers = false;
    let internal = false;

    /** @type {Set<string>} */
    const permissions = new Set();

    /** @type {Set<string>} */
    const manifestKeys = new Set();

    /** @type {Set<string>} */
    const behaviorKeys = new Set();

    const namePrefixLoad = {
      'permission:': permissions,
      'manifest:': manifestKeys,
      'behavior:': behaviorKeys,
    };

    /** @type {Set<string>} */
    const commandLineSwitches = new Set();

    /** @type {RestrictSet<featureTypes.Context>} */
    const contexts = new RestrictSet();

    /** @type {RestrictSet<featureTypes.ExtensionType>} */
    const extensionTypes = new RestrictSet();

    /** @type {RestrictSet<featureTypes.Platform>} */
    const platforms = new RestrictSet();

    /** @type {featureTypes.Channel} */
    let channel = 'stable';

    for (const feature of run) {
      for (const check in namePrefixLoad) {
        if (feature.id.startsWith(check)) {
          const add = feature.id.substr(check.length);
          namePrefixLoad[check].add(add);
        }
      }

      channel = mostRestrictiveChannel(channel, feature.channel ?? 'stable');
      if (feature.command_line_switch) {
        commandLineSwitches.add(feature.command_line_switch);
      }
      if (feature.component_extensions_auto_granted === false) {
        componentExtensionsAutoGranted = false;
      }
      if (feature.disallow_for_service_workers === true) {
        disallowForServiceWorkers = true;
      }
      contexts.restrict(feature.contexts);
      extensionTypes.restrict(feature.extension_types);
      platforms.restrict(feature.platforms);

      // We do NOT filter on this, because it's set for "chrome.events" and "chrome.types".
      // This is because these types don't really exist, and can't be constructed. Actually
      // internal or private types are suffixed as such, and we filter externally to this file.
      if (feature.internal) {
        internal = true;
      }

      // Don't return data on kiosk mode. (We could put this in a RestrictSet instead.)
      if (feature.session_types && !feature.session_types.includes('regular')) {
        return;
      }

      // We don't represent a specific extension ID, fail.
      if (feature.allowlist) {
        return;
      }

      // Only allow matches if "<all_urls>" is included.
      if (feature.matches && !feature.matches.includes('<all_urls>')) {
        return;
      }
    }

    // If we only support "legacy_packaged_app", then don't allow this option.
    const extensionTypesArray = extensionTypes.get().filter((et) => et !== 'legacy_packaged_app');
    if (extensionTypesArray.length === 0) {
      return;
    }

    return {
      permissions: [...permissions],
      manifestKeys: [...manifestKeys],
      behaviors: [...behaviorKeys],
      channel,
      commandLineSwitches: [...commandLineSwitches],
      componentExtensionsAutoGranted,
      disallowForServiceWorkers,
      internal,
      contexts: contexts.get(),
      extensionTypes: extensionTypesArray,
      platforms: platforms.get(),
    };
  };

  /**
   * This builds a helper which allows for rapid testing and evaluation of named API features. It
   * allows us to both check requirements as well as expand results.
   *
   * If the feature specified is not found, this returns a valid but empty data structure. These
   * are always permitted and have no restrictions!
   *
   * In the C++ code, this isn't really needed: extensions just query with their very exact context
   * and are returned a specific yes/no as to whether they can use this feature.
   *
   * @param {string} name to expand
   * @return {featureTypes.FlatFeature=}
   */
  expand(name) {
    if (!(name in this.#raw)) {
      return this.#test([]);
    }

    /**
     * @type {{pendingDependencies: string[], features: featureTypes.IdFeature[]}[]}
     */
    const work = [
      {
        pendingDependencies: [name],
        features: [],
      },
    ];

    for (;;) {
      const currentIndex = work.findIndex(({pendingDependencies}) => pendingDependencies.length);
      if (currentIndex === -1) {
        break;
      }
      const current = work.splice(currentIndex, 1)[0];
      const pendingDependency = current.pendingDependencies.shift();
      if (pendingDependency === undefined) {
        throw new Error(`findIndex assertion failure: ${currentIndex}`);
      }
      if (current.features.find(({id}) => id === pendingDependency)) {
        throw new Error(`got circular dependency chain`);
      }

      // Add futher dependencies.
      const maybeComplexFeature = this.#flat(pendingDependency);
      for (const feature of maybeComplexFeature) {
        const idFeature = Object.assign({id: pendingDependency}, feature);
        work.push({
          pendingDependencies: current.pendingDependencies.concat(feature.dependencies ?? []),
          features: current.features.concat(idFeature), 
        });
      }
    }

    const expanded = work.map(({features}) => features).filter((features) => features.length);
    const restrictedBase = expanded.map(this.#test).filter(Boolean);

    // Cast this as TS doesn't know we've removed nullables.
    const ambig = /** @type {NonNullable<(typeof restrictedBase[0])>[]} */ (restrictedBase);

    if (ambig.length <= 1) {
      return ambig[0];
    }

    // Prefer information about extensions over other types of apps. As they're deprecated we just
    // show data for extensions.
    const removeNonExtension = ambig.filter(({extensionTypes}) => extensionTypes.includes('extension'));
    if (removeNonExtension.length === 1) {
      return removeNonExtension[0];
    }

    // Merge these multiples back into one. They all apply to extensions and this rarely happens in
    // practice.
    // Technically this returns an object implying that we need BOTH permissions, but the user code
    // rendering this doesn't distinguish this from an "or".
    let out = /** @type {featureTypes.FlatFeature} */ (ambig.shift());
    while (ambig.length) {
      out = mergeFlat(out, ambig.shift());
    }
    return out;
  }
}


/**
 * @param {featureTypes.FlatFeature} a
 * @param {featureTypes.FlatFeature=} b
 * @return {featureTypes.FlatFeature}
 */
function mergeFlat(a, b) {
  if (!b) {
    return a;
  }

  /**
   * @template T
   * @param {T[]} a
   * @param {T[]} b
   * @return {T[]}
   */
  const mergeArray = (a, b) => [...new Set([...a, ...b])];

  /**
   * @template T
   * @param {(T | featureTypes.All)[]} a
   * @param {(T | featureTypes.All)[]} b
   * @return {(T | featureTypes.All)[]}
   */
  const mergeWithAll = (a, b) => {
    if (a.includes('all') || b.includes('all')) {
      return ['all'];
    }
    return mergeArray(a, b);
  }

  return {
    permissions: mergeArray(a.permissions, b.permissions),
    manifestKeys: mergeArray(a.manifestKeys, b.manifestKeys),
    behaviors: mergeArray(a.behaviors, b.behaviors),
    channel: leastRestrictiveChannel(a.channel, b.channel),
    commandLineSwitches: mergeArray(a.commandLineSwitches, b.commandLineSwitches),
    componentExtensionsAutoGranted: a.componentExtensionsAutoGranted || b.componentExtensionsAutoGranted,
    disallowForServiceWorkers: a.disallowForServiceWorkers || b.disallowForServiceWorkers,
    internal: a.internal || b.internal,
    contexts: mergeWithAll(a.contexts, b.contexts),
    extensionTypes: mergeWithAll(a.extensionTypes, b.extensionTypes),
    platforms: mergeWithAll(a.platforms, b.platforms),
  };
}


/**
 * @param {string[]} fromPaths
 */
export async function loadFeatures(fromPaths) {
  /** @type {featureTypes.FeatureFile} */
  const features = {};

  for (const p of fromPaths) {
    const all = fs.readdirSync(p).map((x) => {
      const m = featureNameRegexp.exec(x);
      return m ? m[1] : '';
    }).filter(Boolean);

    for (const type of all) {
      const src = path.join(p, `_${type}_features.json`);
      const raw = JSON5.parse(fs.readFileSync(src));

      for (const name in raw) {
        const key = `${type}:${name}`;
        if (key in features) {
          throw new TypeError(`got duplicate feature "${key}" from: ${src}`);
        }
        features[key] = raw[name];
      }
    }
  }

  // Iterate over all raw features to ensure they are correct.
  for (const key in features) {
    [features[key]].flat().forEach(fixHistoricFeature);
  }

  return new FeatureTest(features);
}


/**
 * Is the request channel allowed to use the this feature based on its channel?
 *
 * @param {featureTypes.Channel} requestChannel
 * @param {featureTypes.Channel=} featureChannel
 * @return {boolean}
 */
export function allowedChannel(requestChannel, featureChannel) {
  const indexRequest = channelOrdering.indexOf(requestChannel);
  const indexFeature = channelOrdering.indexOf(featureChannel ?? 'stable');

  if (indexRequest === -1 || indexFeature === -1) {
    throw new TypeError(`got bad channels: ${requestChannel} vs ${featureChannel}`);
  }
  return indexRequest >= indexFeature;
}


/**
 * Finds the least restrictive channel from the arguments.
 *
 * @param {featureTypes.Channel} channel
 * @param {...featureTypes.Channel} rest
 * @return {featureTypes.Channel}
 */
export function leastRestrictiveChannel(channel, ...rest) {
  let index = channelOrdering.indexOf(channel);

  for (const r of rest) {
    const cand = channelOrdering.indexOf(r);
    index = Math.min(cand, index);
  }

  return channelOrdering[index] ?? 'stable';
}


/**
 * Finds the most restrictive channel from the arguments.
 *
 * @param {featureTypes.Channel} channel
 * @param {...featureTypes.Channel} rest
 * @return {featureTypes.Channel}
 */
export function mostRestrictiveChannel(channel, ...rest) {
  let index = channelOrdering.indexOf(channel);

  for (const r of rest) {
    const cand = channelOrdering.indexOf(r);
    index = Math.max(cand, index);
  }

  return channelOrdering[index] ?? 'stable';
}


/**
 * This ensures that some historic names used in Chromium are updated to modern standards before
 * processing.
 *
 * @param {featureTypes.Feature} feature
 */
function fixHistoricFeature(feature) {
  const fixes = {'black': 'block', 'white': 'allow'};
  for (const fixName in fixes) {
    const previous = feature[fixName + 'list'];
    if (previous !== undefined) {
      delete feature[fixName + 'list'];
      feature[fixes[fixName] + 'list'] = previous;
    }
  }
}

