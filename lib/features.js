/**
 * Copyright 2020 Google LLC
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

import {promises as fsPromises} from 'fs';
import JSON5 from 'json5';
import path from 'path';


function filterApiFeaturesRow(row) {
  let {contexts = []} = row;
  if (typeof contexts === 'string') {
    contexts = [contexts];
  }

  // Contexts is unrelated to extension vs app and so on. It just means source code from a valid
  // extension-like source tree.
  if (!contexts.includes('blessed_extension')) {
    return false;
  }

  const {matches = []} = row;
  if (matches.length && !matches.includes('<all_urls>')) {
    return false;
  }

  return filterOtherRow(row);
}


function filterOtherRow(row) {
  const {command_line_switch, whitelist, internal} = row;
  if (whitelist?.length || internal || command_line_switch) {
    return false;
  }

  const {dependencies = []} = row;
  if (dependencies.some((dep) => {
    return dep.startsWith('behavior:');
  })) {
    return false;
  }

  return true;
}


class FeaturesHolder {
  #raw;

  /**
   * @param {{[featureKey: string]: {[name: string]: object[]}}} raw
   */
  constructor(raw) {
    this.#raw = raw;
  }

  /**
   * @param {string} featureKey one of 'api' and so on
   * @param {string} id to look up
   * @return {object[]}
   */
  lookup(featureKey, id) {
    const feature = this.#raw[featureKey];
    return feature?.[id] ?? [];
  }

  /**
   * @param {string} featureKey one of 'api' and so on
   * @param {string} id to look up underneath
   * @return {{[id: string]: object[]}}
   */
  allUnder(featureKey, id) {
    const feature = this.#raw[featureKey];
    if (feature === undefined) {
      return {};
    }

    const out = {};
    const prefix = id + '.';
    for (const check in feature) {
      if (check.startsWith(prefix)) {
        out[check] = feature[check];
      }
    }
    return out;
  }
}


export async function loadFeatures(fromPaths) {
  /** @type {{[featureKey: string]: {[name: string]: object[]}}} */
  const features = {
    'api': {},
    'behavior': {},
    'manifest': {},
    'permission': {},
  };
  for (const featuresPath of fromPaths) {
    for (const featureKey in features) {
      const p = path.join(featuresPath, `_${featureKey}_features.json`);
      let raw;
      try {
        raw = await fsPromises.readFile(p);
      } catch (e) {
        continue;
      }
      const parsed = JSON5.parse(raw);
      const local = features[featureKey];

      for (const id in parsed) {
        if (!(id in local)) {
          local[id] = [];
        }
        let value = parsed[id];
        if (!Array.isArray(value)) {
          value = [value];
        }
        local[id].push(...value);
      }
    }
  }
  return new FeaturesHolder(features);
}


/**
 * @param {string} was
 * @param {string|undefined} update
 * @return {string}
 */
function updateChannel(was, update) {
  if (update === undefined) {
    return was;
  }
  if (was && update !== was) {
    console.warn('got invalid channnel update', was, update);
  }
  return update;

  // if (update === 'stable') {
  //   return update;
  // } else if (was === 'stable') {
  //   return was;
  // }

  // if (update === 'beta') {
  //   return update;
  // }



  // if (!update) {
  //   return was;
  // } else if (update === 'dev') {
  //   return update;
  // } else if (was === 'dev') {
  //   return was;
  // } else if (update === 'beta') {
  //   return update;
  // }
  // return was;
}


/**
 * @param {string} id
 * @param {FeaturesHolder} features
 */
export function extractConfig(id, features) {
  if (id.endsWith('Private') || id.endsWith('Internal') || id.endsWith('test')) {
    return null;
  }

  const apiRows = features.lookup('api', id).filter(filterApiFeaturesRow);

  const validRows = apiRows.filter(filterApiFeaturesRow);
  if (!validRows.length) {
    if (apiRows.length) {
      return null;
    }

    // This didn't have any config (e.g. "events").
    return {
      channel: 'stable',
      permissions: new Set(),
      manifestKeys: new Set(),
      extensionTypes: new Set(),
      platforms: new Set(),
    };
  }

  // TODO(samthor): Some sub-methods appear in apiFeatures that have specific permission
  // requirements. The old code doesn't handle them either.
  // Instead of passing apiFeature rows directly, pass the whole object and ID.

  const extensionTypes = new Set();
  const platforms = new Set();
  let channel = '';

  const permissions = new Set();
  const manifests = new Set();
  const checks = {
    'permission:': permissions,
    'manifest:': manifests,
  };

  const updateApiRow = (row) => {
    let {extension_types: typesSource} = row;
    if (typeof typesSource === 'string') {
      typesSource = [typesSource];
    } else if (typesSource === undefined) {
      typesSource = [];
    }

    const {platforms: platformsSource = []} = row;
    typesSource.forEach((type) => extensionTypes.add(type));
    platformsSource.forEach((platform) => platforms.add(platform));
    channel = updateChannel(channel, row.channel);
  };

  // Extract permissions/manifest dependencies from the extension.
  for (const row of validRows) {
    const {dependencies = []} = row;
    updateApiRow(row);

    for (const dependency of dependencies) {
      for (const check in checks) {
        if (dependency.startsWith(check)) {
          const value = dependency.substr(check.length);
          checks[check].add(value);
        }
      }
    }
  }

  // We now have to _futher_ include and check related stuff found in permissions or manifest.
  for (const permission of permissions) {
    const p = features.lookup('permission', permission).filter(filterOtherRow);
    p.forEach(updateApiRow);
  }
  for (const manifest of manifests) {
    const m = features.lookup('manifest', manifest).filter(filterOtherRow);
    m.forEach(updateApiRow);
  }

  channel = channel || 'stable';

  return {
    channel,
    permissions,
    manifestKeys: manifests,
    extensionTypes,
    platforms,
  };
}