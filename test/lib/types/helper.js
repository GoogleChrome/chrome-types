/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License t
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import test from 'ava';

// Dummy test so Ava doesn't complain about this file.
test('helper', t => t.truthy(true));


import * as tmp from 'tmp';
import * as path from 'path';
import * as fs from 'fs';
import {generateTypeDocObject} from '../../../lib/types/parse.js';

import * as typedocModels from 'typedoc/dist/lib/models/index.js';


/**
 * Parses TypeScript definitions.
 *
 * @return {typedocModels.ProjectReflection}
 */
export function parse(code) {
  const r = tmp.dirSync();
  try {
    const target = path.join(r.name, 'index.d.ts');
    fs.writeFileSync(target, code);
    return generateTypeDocObject(target);
  } finally {
    fs.rmSync(r.name, {recursive: true});
  }
}

/**
 * Finds the type based on TypeDoc's built-in matcher.
 *
 * @param {typedocModels.ProjectReflection} project
 * @param {string} name
 * @return {typedocModels.Type}
 */
export function typeOf(project, name) {
  const r = project.findReflectionByName(name);
  if (!r) {
    throw new Error(`can't find ${name}`);
  }
  if (!(r instanceof typedocModels.DeclarationReflection) || !r.type) {
    throw new Error(`${name} must be DeclarationReflection with type`);
  }
  return r.type;
}
