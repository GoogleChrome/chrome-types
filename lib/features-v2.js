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


const featureNameRegexp = /^_(\w+)_features\.json$/;


/** @type {featureTypes.Channel[]} */
const channelOrdering = ['stable', 'beta', 'dev', 'canary', 'trunk'];


/**
 * Find the parent name by stripping the last dot-separated part. Returns an empty string if there
 * is no valid parent.
 *
 * @param {string} name
 * @return {string}
 */
function parentFeatureName(name) {
  const dot = name.lastIndexOf('.');
  if (dot === -1) {
    return '';
  }
  return name.slice(0, dot);
}


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
   * @return {featureTypes.Feature[] }
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

  // /**
  //  * Tests a single internal feature.
  //  *
  //  * @param {featureTypes.Feature} feature
  //  * @return {boolean}
  //  */
  // #testInternalFeature = (feature) => {

  //   // We don't represent a specific extension ID, fail.
  //   if (feature.allowlist) {
  //     return false;
  //   }

  //   // Only allow matches if "<all_urls>" is included.
  //   if (feature.matches && !feature.matches.includes('<all_urls>')) {
  //     return false;
  //   }

  //   const failed = (feature.dependencies ?? []).some((name) => !this.#testInternalName(name));
  //   return !failed;
  // };

  // /**
  //  * Tests a single internal feature by name. This allows for complex features.
  //  *
  //  * @param {string} name
  //  * @return {boolean}
  //  */
  // #testInternalName = (name) => {
  //   console.warn('testing', name);
  //   const features = this.#flat(name);
  //   return !features.length || features.some((feature) => this.#testInternalFeature(feature));
  // };

  allApis() {
    return Object.keys(this.#raw).filter((x) => x.startsWith('api:'));
  }

  /**
   * This builds a helper which allows for rapid testing and evaluation of named API features. It
   * allows us to both check requirements as well as expand results.
   *
   * In the C++ code, this isn't really needed: extensions just query with their very exact context
   * and are returned a specific yes/no as to whether they can use this feature.
   *
   * @param {string} name to expand
   */
  expand(name) {
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
    // console.warn(name);
    // for (let i = 0; i < expanded.length; ++i) {
    //   console.warn(`${i}: ${JSON.stringify(expanded[i])}`);
    // }
    // console.warn();

    return new FeatureExpand(expanded);
  }
}


class FeatureExpand {
  #expanded;

  /**
   * @param {featureTypes.IdFeature[][]} expanded
   */
  constructor(expanded) {
    this.#expanded = expanded;
  }

  /**
   * @param {featureTypes.IdFeature[]} run
   * @return {{permissions: string[]}=}
   */
  #test = (run) => {
    /** @type {Set<string>} */
    const permissions = new Set();

    for (const feature of run) {
      if (feature.id.startsWith('permission:')) {
        permissions.add(feature.id.substr('permission:'.length));
      }

      if (feature.internal) {
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

    return {
      permissions: [...permissions],
    };
  };

  test() {
    for (const run of this.#expanded) {
      const out = this.#test(run);
      if (out) {
        return out;
      }
    }
  }
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

export function extractConfig() {}