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


import {generateTypeDocObject, fullName} from '../../../lib/types';
import * as typedocModels from 'typedoc/dist/lib/models/index.js';
import * as path from 'path';
import * as types from '../../../types/symbol.js';


const {pathname: extrasPath} = new URL('./extras.d.ts', import.meta.url);


/**
 * Finds all symbols in this project and their release type.
 *
 * @param {typedocModels.ProjectReflection} project
 * @param {(check: string) => boolean} filter
 * @return {{[name: string]: types.RawSymbolInfo}}
 */
function findAll(project, filter = (s) => true) {
  /** @type {{[name: string]: types.RawSymbolInfo}} */
  const out = {};

  // TODO(samthor): global reflections are deprecated
  for (const stringId in project.reflections) {
    const id = +stringId;
    const r = project.getReflectionById(id);

    const fqdn = r ? fullName(r) : '';
    if (!fqdn || !filter(fqdn)) {
      continue;
    }

    // This can replace a previous entry, but we're always deeper when we do this, so it's probably
    // more correct re: deprecated notice. This only occurs for (Function|Method) => CallSignature.
    out[fqdn] = {
      release: findRelease(r),
      deprecated: isDeprecated(r),
    };
  }

  return out;
}


/**
 * Finds the release for the given Reflection.
 *
 * @param {typedocModels.Reflection|undefined} r
 * @return {types.Channel}
 */
function findRelease(r) {
  /** @type {types.Channel} */
  let release = 'stable';

  while (r) {
    if (!release && r.comment?.hasTag('beta')) {
      release = 'beta';
    } else if (r.comment?.hasTag('alpha')) {
      release = 'dev';
      break;  // can't be higher than this
    }

    r = r.parent;
  }

  return release;
}


/**
 * Finds whether this is deprecated.
 *
 * @param {typedocModels.Reflection|undefined} r
 * @return {boolean}
 */
function isDeprecated(r) {
  while (r) {
    if (r.comment?.hasTag('deprecated')) {
      return true;
    }
    r = r.parent;
  }
  return false;
}


/**
 * Finds all raw data for a specific release. Expects data to be found at:
 *   "<root>/<version>/{index,platform_app}.d.ts"
 *
 * @param {number} version
 * @return {Promise<{[name: string]: types.RawSymbolInfo}>}
 */
export default async function generate(root, version) {
  const p = path.join(root, `${version}`);

  const extensionApisProject = await generateTypeDocObject(path.join(p, 'index.d.ts'), extrasPath);
  const plaformAppApisProject = await generateTypeDocObject(path.join(p, 'platform_app.d.ts'), extrasPath);

  const names = findAll(extensionApisProject, (name) => name.startsWith('chrome.'));
  const platformAppNames = findAll(plaformAppApisProject, (name) => name.startsWith('chrome.'));

  // Add names from the platform app set to the core set.
  const has = new Set(Object.keys(names));
  for (const name in platformAppNames) {
    if (!has.has(name)) {
      has.add(name);
      names[name] = platformAppNames[name];
    }
  }

  for (const name in names) {
    applyQuirk(version, name, names[name]);
  }

  return names;
}


/**
 * @param {string} name to analyze
 * @param {string} q to use to check
 */
function hasPrefix(name, q) {
  return name === q || name.startsWith(`${q}.`);
}


/**
 * @param {number} version
 * @param {string} name
 * @param {types.RawSymbolInfo} raw
 */
function applyQuirk(version, name, raw) {
  return;  // TODO

  if (version <= 53) {
    if (hasPrefix(name, 'chrome.input.ime')) {
      raw.release = 'stable';
    }
  }

  if (version <= 70) {
    if (hasPrefix(name, 'chrome.declarativeNetRequest')) {
      raw.release = 'dev';
    }
  }

  if (version <= 76) {
    if (hasPrefix(name, 'chrome.management')) {
      raw.release = 'stable';
    }
  }

  if (version === 77) {
    if (hasPrefix(name, 'chrome.storage')) {
      raw.release = 'stable';
    }
  }

}