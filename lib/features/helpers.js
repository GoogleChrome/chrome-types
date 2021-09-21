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

import * as types from '../../types/index.js';


const permissionFeaturePrefix = 'permission:';
const manifestFeaturePrefix = 'manifest:';


/**
 * Defines the channel availability ordering. Earlier values imply availability in later ones.
 *
 * @type {types.Channel[]}
 */
const channelOrdering = ['stable', 'beta', 'dev', 'canary', 'trunk'];


/**
 * @param {types.Channel=} channel
 * @return {number}
 */
export function channelOrder(channel) {
  if (!channel) {
    return -1;
  }
  return channelOrdering.indexOf(channel);
}


export class Features {
  #source;

  #skipVersionData = false;

  /** @type {{[feature: string]: types.VersionInfo}} */
  #versionData = {};

  /**
   * Process all raw feature files, seen as a number of top-level dictionaries. Takes ownership of
   * the passed features.
   *
   * @param {types.RawFeatureFile} source
   * @param {types.SymbolsVersionInfo?} symbols
   */
  constructor(source, symbols = null) {
    this.#source = processFeatures(source);

    if (symbols === null) {
      this.#skipVersionData = true;
    } else {
      for (const path in symbols) {
        this.#versionData[`api:${path}`] = symbols[path];
      }
    }
  }

  /**
   * @param {string} path
   * @return {types.RawFeature[]}
   */
  #topsForClosest = (path) => {
    // Start at the first valid path. This allows a top-level complex dependency above a specific
    // path (only used in `api:accessibilityFeatures` for now).
    // while (path && !(path in this.#source)) {
    //   path = parentName(path);
    // }

    return this.#rawArray(path).map((top) => {
      let work = path;
      for (;;) {
        if (top.noparent) {
          break;  // catches initial AND update noparent
        }

        work = parentName(work);
        if (!work) {
          break;
        }

        let lookup = this.#source[work] ?? {};
        if (Array.isArray(lookup)) {
          if (lookup.length === 1) {
            lookup = lookup[0];
          } else {
            const defaultParent = lookup.find(({default_parent}) => default_parent);
            if (!defaultParent) {
              throw new Error(`could not find default parent for: ${path}, lookup length: ${lookup.length}`);
            }
            lookup = defaultParent;
          }
        }

        top = Object.assign({}, lookup, top);
      }

      return top;
    });
  };

  /**
   * @param {string} path
   * @return {types.RawFeature?}
   */
  #singleResolve = (path) => {
    const tops = this.#topsForClosest(path);
    const filtered = tops.filter((f) => {
      if (f._skip) {
        return false;
      }
      return true;
    });

    if (filtered.length >= 2) {
      console.warn(filtered);
      throw new Error(`got multiple ambig for ${path}: ${filtered.length}`);
    }
    return filtered[0] ?? null;
  };

  /**
   * @param {string} path
   * @return {types.RawFeature[]}
   */
  #rawArray = (path) => {
    const out = this.#source[path];
    if (out === undefined) {
      return [{}];
    } else if (Array.isArray(out)) {
      return out;
    } else {
      return [out];
    }
  };

  /**
   * @param {string} path
   * @return {Partial<types.Feature>?}
   */
  query(path) {
    const dependencies = [path];
    const seenDependencies = new Set(dependencies);

    /** @type {Set<string>} */
    const selfPermissions = new Set();

    /** @type {Set<string>} */
    const selfManifestRequirements = new Set();

    /** @type {types.RawFeature[]} */
    const rawFeatures = [];

    for (let i = 0; i < dependencies.length; ++i) {
      const name = dependencies[i];

      const lookup = this.#singleResolve(name);
      if (lookup === null) {
        // This is explicitly disallowed (rather than being blank). Abort.
//        console.warn('disallowing', path, 'based on', name, this.#source[name]);
        return null;
      }

      if (name.startsWith(permissionFeaturePrefix)) {
        const permission = name.substr(permissionFeaturePrefix.length);
        selfPermissions.add(permission);
      }

      if (name.startsWith(manifestFeaturePrefix)) {
        const manifestRequirement = name.substr(manifestFeaturePrefix.length);
        selfManifestRequirements.add(manifestRequirement);
      }

      rawFeatures.push(lookup);

      (lookup.dependencies || []).forEach((dependency) => {
        if (!seenDependencies.has(dependency)) {
          seenDependencies.add(dependency);
          dependencies.push(dependency);
        }
      });
    }

    /** @type {Partial<types.Feature>} */
    const selfFeature = {
      supportedInChannel: 'stable',
    };

    for (const f of rawFeatures) {
      if (f.channel && channelOrder(f.channel) > channelOrder(selfFeature.supportedInChannel)) {
        selfFeature.supportedInChannel = f.channel;
      }
      if (f.disallow_for_service_workers) {
        selfFeature.disallowForServiceWorkers = true;
      }
      if (f.min_manifest_version !== undefined) {
        selfFeature.minManifestVersion = Math.max(selfFeature.minManifestVersion ?? 0, f.min_manifest_version);
      }
      if (f.max_manifest_version !== undefined) {
        selfFeature.maxManifestVersion = Math.min(selfFeature.maxManifestVersion ?? Infinity, f.max_manifest_version);
      }
      if (f.platforms?.length) {
        if (!f.platforms.includes('chromeos')) {
          throw new Error(`can only restrict to chromeos, found; ${f.platforms}`);
        }
        selfFeature.chromeOsOnly = true;
      }
      if (f.extension_types?.length) {
        if (f.extension_types.includes('platform_app') && !f.extension_types.includes('extension')) {
          selfFeature.platformAppsOnly = true;
        }
      }
    }

    if (selfPermissions.size) {
      selfFeature.permissions = [...selfPermissions];
    }

    if (selfManifestRequirements.size) {
      selfFeature.manifestRequirements = [...selfManifestRequirements];
    }

    if (!this.#skipVersionData) {
      /** @type {types.VersionInfo=} */
      const versionData = this.#versionData[path];
      if (versionData) {
        if (selfFeature.supportedInChannel === undefined) {
          selfFeature.supportedInChannel = 'stable';
        }
        if (selfFeature.supportedInChannel === 'stable' && versionData.low) {
          // We only report this version if the API is stable.
          selfFeature.availableFromVersion = versionData.low;
        }
        if (versionData.deprecated !== undefined) {
          selfFeature.deprecatedSinceVersion = versionData.deprecated;
        }
      } else {
        // There's no data for this feature. Just mark as unknown and let the renderer work it out.
        selfFeature.unknownVersion = true;
      }
    }

    return selfFeature;
  }
}


/**
 * Returns a sparse {@link types.Feature} describing the differences between a target feature and
 * its parent feature (both which must not be sparse themselves).
 *
 * @param {Partial<types.Feature>} selfFeature
 * @param {Partial<types.Feature>} parentFeature
 * @return {Partial<types.Feature>}
 */
export function sparseFeature(selfFeature, parentFeature) {
  /** @type {Partial<types.Feature>} */
  const out = {};

  const allKeys = new Set([...Object.keys(parentFeature), ...Object.keys(selfFeature)]);
  allKeys.delete('permissions');

  for (const key of allKeys) {
    if (selfFeature[key] && parentFeature[key] !== selfFeature[key]) {
      out[key] = selfFeature[key];
    }
  }

  const sparsePermissions = setDifference(parentFeature.permissions, selfFeature.permissions);
  if (sparsePermissions.length) {
    out.permissions = sparsePermissions;
  }

  const sparseManifestRequirements = setDifference(
      parentFeature.manifestRequirements, selfFeature.manifestRequirements);
  if (sparseManifestRequirements.length) {
    out.manifestRequirements = sparseManifestRequirements;
  }

  return out;
}


/**
 * @param {Iterable<string>|undefined} parent
 * @param {Iterable<string>|undefined} self
 * @return {string[]}
 */
export function setDifference(parent, self) {
  const sparse = new Set(self ?? []);
  for (const remove of parent ?? []) {
    sparse.delete(remove);
  }
  return [...sparse];
}


/**
 * Process all raw feature files, seen as a number of top-level dictionaries. Takes ownership of
 * the passed features.
 *
 * @param {types.RawFeatureFile} source
 * @return {types.RawFeatureFile}
 */
export function processFeatures(source) {

  /** @type {types.RawFeatureFile} */
  const all = {};

  for (const name in source) {
    let raw = source[name];
    if (!Array.isArray(raw)) {
      raw = [raw];
    }
    raw.forEach((f) => fixHistoricFeature(f));

    let filtered = raw.filter((f) => filterRawFeature(name, f));
    if (!filtered.length) {
      // This is a simple feature that can be quickly filtered out. We can't/don't use "internal"
      // here as some types are internal yet we still render them.
      all[name] = {_skip: true};
    } else if (filtered.length === 1) {
      all[name] = filtered[0];
    } else {
      // There are some complex features we override into single cases otherwise it would be
      // impossible to sanely render them either as .d.ts or on the developer.chrome.com site.
      const update = overrideFeatures(name, filtered);

      if (filtered.length > 1) {
        // TODO(samthor): This happens a bit and could potentially cause ambiguous resolution
        // of API features. But for now we're not hitting them in the resolve step.
        // console.warn('got multiples?', name, filtered.length, filtered, 'update?', update);
      }

      if (update) {
        filtered.splice(0, filtered.length, update);
      }

      all[name] = filtered;
    }
  }

  return all;
}


/**
 * This filters to raw features that can be rendered, removing features e.g., with allowlists or
 * behind flags.
 *
 * @param {string} name
 * @param {types.RawFeature} feature
 * @return {boolean}
 */
function filterRawFeature(name, feature) {
  if (!filterFeatureName(name)) {
    return false;
  }

  // This feature is limited to specific IDs.
  if (feature.allowlist?.length) {
    return false;
  }

  // This is still in development.
  if (feature.command_line_switch) {
    return false;
  }

  // TODO(samthor): This disallows the Platform Apps APIs "virtualKeyboard" and "networking.onc",
  // which are still documented on the site. Both APIs document their kiosk-only state in their
  // description so we don't have to make further noise about them.
  // Only allow regular, not "kiosk".
  if (feature.session_types?.length && !feature.session_types.includes('regular')) {
    return false;
  }

  // Only allow matching all URLs.
  if (feature.matches?.length && !feature.matches.includes('<all_urls>')) {
    return false;
  }

  // Only allow a limited set of extension types.
  if (Array.isArray(feature.extension_types)) {
    /** @type {types.ExtensionType[]} */
    const allowedTypes = ['extension', 'platform_app'];
    const ok = allowedTypes.some((check) => feature.extension_types?.includes(check));
    if (!ok) {
      return false;
    }
  }

  return true;
}


/**
 * Filters features that are not rendered.
 *
 * @param {string} name
 * @return {boolean}
 */
export function filterFeatureName(name) {
  const parts = name.split('.');

  return !parts.some((part) => {
    return part.endsWith('Private') || part.endsWith('Internal') || part === 'api:idltest' || part === 'api:test';
  });
}


/**
 * @param {string} path
 * @return {string}
 */
export function parentName(path) {
  const dot = path.lastIndexOf('.');
  if (dot === -1) {
    return '';
  }
  return path.substr(0, dot);
}


/**
 * This ensures that some historic names used in Chromium are updated to modern standards before
 * processing.
 *
 * @param {types.RawFeature} feature
 */
function fixHistoricFeature(feature) {
  // -"list" is suffixed to these properties.
  const upgrades = {
    'black': 'block',
    'white': 'allow',
  };
  for (const fromPrefix in upgrades) {
    const previous = feature[fromPrefix + 'list'];
    if (previous !== undefined) {
      delete feature[fromPrefix + 'list'];
      const toPrefix = upgrades[fromPrefix];
      feature[toPrefix + 'list'] = previous;
    }
  }
}


/**
 * @param {string} name
 * @param {types.RawFeature[]} features
 */
function overrideFeatures(name, features) {
  switch (name) {
    // TODO(samthor): These both have "multiple" allowed permission paths. We just pretend both
    // are required since our display is ambiguous re: AND/OR.
    case 'api:declarativeNetRequest':
    case 'api:accessibilityFeatures':
    case 'api:declarativeNetRequest.onRuleMatchedDebug': {
      /** @type {Set<string>} */
      const allDependencies = new Set();
      for (const each of features) {
        (each.dependencies ?? []).forEach((d) => allDependencies.add(d));
      }
      return Object.assign({}, features[0], {dependencies: [...allDependencies]});
    }

    case 'permission:proxy': {
      /** @type {Set<types.ExtensionType>} */
      const allExtensionTypes = new Set();
      for (const each of features) {
        if (each.extension_types === 'all') {
          // This should never happen but short-circuit anyway.
          return Object.assign({}, features[0], {extension_types: 'all'});
        }
        (each.extension_types ?? []).forEach((d) => allExtensionTypes.add(d));
      }
      return Object.assign({}, features[0], {extension_types: [...allExtensionTypes]});
    }

  }

}
