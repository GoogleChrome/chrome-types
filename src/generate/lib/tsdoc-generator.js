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


import {tasks, exec} from './runners.js';
import {extractNamespaceName} from './typedoc-helper.js';
import fg from 'fast-glob';
import * as path from 'path';


/**
 * Invoke the internal Chrome types compiler and generate ".d.ts" source.
 *
 * @param {string} root dir to operate in
 * @param {string} rel path to compile within that root
 * @return {Promise<string>}
 */
async function invokeCompiler(root, rel) {
  const args = ['python', 'tools/json_schema_compiler/compiler.py', '-g', 'tsdoc', rel];
  const {code, out} = await exec(args, root);
  const s = out.toString('utf-8');
  if (code) {
    throw new Error(`Error converting (${code}): \"${rel}\"`);
  }
  return s.trim();
}


/**
 * @param {string} root of Chromium source
 * @param {string[]} definitionPaths relative definition paths
 * @return {Promise<{namespaceName: string, source: string}[]>}
 */
export async function generateAll(root, definitionPaths) {

  /** @type {string[]} */
  const definitions = [];
  for (const definitionPath of definitionPaths) {
    const p = path.join(root, definitionPath);

    // We need to glob including subfolders as "devtools" contains inner JSON files.
    const list = fg.sync('**/*.{json,idl}', {cwd: p}).filter((p) => {
      return !p.startsWith('_') && (p.endsWith('.json') || p.endsWith('.idl'));
    }).map((rel) => path.join(definitionPath, rel));
    definitions.push(...list);
  }

  const tmp = await tasks(definitions, async (rel) => {
    const source = await invokeCompiler(root, rel);
    if (!source) {
      return;
    }
    const namespaceName = extractNamespaceName(source);
    if (!namespaceName) {
      return;
    }
    return {namespaceName, source};
  });

  const generated = /** @type {NonNullable<typeof tmp[0]>[]} */ (tmp.filter(Boolean));
  generated.sort(({namespaceName: a}, {namespaceName: b}) => a.localeCompare(b));
  return generated;
}
