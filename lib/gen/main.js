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


import * as model from './model.js';
import * as parser from './parser.js';
import * as path from 'path';
import * as fs from 'fs';
import { Features } from '../features/helpers.js';
import * as types from '../../types/index.js';
import { fetchAllTo } from '../source/fetcher.js';
import fg from 'fast-glob';
import { parseOverride } from './override.js';
import { convertFromIdl } from './idl-convert.js';
import { buildLimit } from '../limit.js';
import { cache } from '../source/cache.js';
import { findDependentNamespaces } from './helper.js';

// @ts-ignore
import JSON5 from 'json5';
// @ts-ignore
import * as tmp from 'tmp';



const definitionPaths = [
  'extensions/common/api',
  'chrome/common/extensions/api',
  'chrome/common/apps/platform_apps/api',
];


// These are used entirely to run `idl_parser.py`.
const toolsPaths = [
  'tools/json_schema_compiler',
  'tools/json_comment_eater',
  'ppapi/generators',
  'third_party/ply',
];


const defaultRevision = 'master';


const featureFileMatch = /^_(\w+)_features.json$/;


/**
 * Prepares information on Chrome extension APIs at the given revision.
 *
 * @param {Partial<types.MainOptions>} options
 * @return {Promise<types.MainResult>}
 */
export async function prepareNamespaces(options = {}) {
  const o = /** @type {types.MainOptions} */ (Object.assign({
    revision: defaultRevision,
    toolsRevision: defaultRevision,
    symbols: null,
    cacheIdlParse: true,
    nodocRemove: true,
  }, options));

  const tmpobj = tmp.dirSync();
  const workPath = tmpobj.name;

  /** @type {types.RawFeatureFile} */
  const features = {};

  /** @type {types.RawNamespace[]} */
  const sources = [];

  try {
    const defitionsPromise = fetchAllTo(workPath, definitionPaths, o.revision);
    const toolsPromise = fetchAllTo(workPath, toolsPaths, o.toolsRevision);

    await defitionsPromise;
    await toolsPromise;

    const allFiles = [];
    for (const p of definitionPaths) {
      const cwd = path.join(workPath, p);
      const all = fg.sync('**/*.{json,idl}', { cwd });
      allFiles.push(...all.map((filename) => path.join(cwd, filename)));
    }

    /** @type {(filename: string) => Promise<Buffer>} */
    const limitConvertFromIdl = buildLimit(convertFromIdl.bind(null, workPath));

    // Walk over every found .json/.idl file and add to the output mix.
    await Promise.all(allFiles.map(async (filename) => {
      const ext = path.extname(filename);
      const basename = path.basename(filename);

      /** @type {string} */
      let raw;

      if (ext === '.idl') {
        let out;
        if (o.cacheIdlParse) {
          // Cache this work for ~60s as default.
          const rel = path.relative(workPath, filename);
          out = await cache(`idl#${rel}`, limitConvertFromIdl.bind(null, filename));
        } else {
          out = await limitConvertFromIdl(filename);
        }
        raw = out.toString('utf-8');
      } else if (ext === '.json') {
        raw = fs.readFileSync(filename, 'utf-8');
      } else {
        return;
      }

      let json;
      try {
        json = JSON5.parse(raw);
      } catch (e) {
        console.warn('bad JSON from', filename, 'ext was?', ext, 'length', raw.length, 'got e', e);
        console.warn(raw);
        process.exit(1);
        throw e;
      }
      if (!basename.startsWith('_')) {
        sources.push(...json);
        return;
      }

      // Check if this is actually a feature file (e.g., _api_feature.json).
      const m = featureFileMatch.exec(basename);
      if (m) {
        const type = m[1];
        for (const id in json) {
          const key = `${type}:${id}`;
          if (key in features) {
            throw new Error(`got duplicate feature key: ${key}`);
          }
          features[key] = json[id];
        }
      }
    }));
  } finally {
    await fs.promises.rm(workPath, { recursive: true });
  }

  const stats = {
    features: Object.keys(features).length,
    namespaces: sources.length,
    skipped: /** @type {string[]} */ ([]),
  };

  /** @type {{[name: string]: model.Namespace}} */
  const all = {};

  const allNamespaceNames = sources.map((raw) => raw.namespace);

  const f = new Features(features, o.symbols);
  const p = new parser.JSONSchemaParser(f, allNamespaceNames);

  sources.forEach((raw) => {
    let namespace;
    try {
      ({ namespace } = p.parse(raw));
    } catch (e) {
      console.warn('failed to parse');
      console.warn(raw);
      throw e;
    }

    // This is a Private or Internal API that is not included in general display.
    if (namespace.nodoc) {
      stats.skipped.push(raw.namespace);
      if (o.nodocRemove) {
        return;
      }
    }

    all[namespace.name] = namespace;
  });
  parseOverride(all);

  // Remove nodoc. We've already removed nodoc _namespaces_ here.
  if (o.nodocRemove) {
    for (const name in all) {
      const namespace = all[name];
      namespace.traverse((_path, prop) => {
        // If we return true from a traversal, the node is removed.
        if (prop.nodoc) {
          return true;
        }
      });
    }
  }

  // Calculate dependencies between namespaces.
  /** @type {{[namespace: string]: string[]}} */
  const deps = {};
  for (const name in all) {
    const d = findDependentNamespaces(all[name], allNamespaceNames);;
    deps[name] = d;
  }
  // TODO: do something with deps

  return {namespaces: all, stats};
}
