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


import * as typedocModels from 'typedoc/dist/lib/models/index.js';


const rk = typedocModels.ReflectionKind;


const knownMagicNames = ['__call', '__type', '__index'];


/**
 * Insert this instead of "." between an interface or function and one of its properties. This
 * can be the dot too, but JSDoc uses "#". TSDoc as of 4.1.3 can't resolve _either_ in at-see or
 * at-link declarations, and only links to functions, interfaces, namespaces or enums (and values).
 */
const propertyDelimiter = '.';


/**
 * @param {typedocModels.Reflection} r
 * @param {string[]} idParts
 */
function internalResolveChild(r, idParts) {
  if (r.kind === rk.Function || r.kind === rk.Method) {
    const decl = /** @type {typedocModels.DeclarationReflection} */ (r);

    for (const signature of decl.signatures ?? []) {
      const result = internalResolveChild(signature, idParts);
      if (result) {
        return result;
      }
    }
    return;
  }

  const left = idParts[0];
  const child = r.getChildByName(left);

  if (child) {
    if (idParts.length === 1) {
      return child;
    }
    idParts = idParts.slice(1);
    return internalResolveChild(child, idParts);
  }

  // If we can't find a child, check known magic names and skip them.
  // TODO(samthor): This relies on no-one declaring e.g., "__type" as a var.
  for (const knownMagic of knownMagicNames) {
    const magic = r.getChildByName(knownMagic);
    if (!magic) {
      continue;
    }
    const cand = internalResolveChild(magic, idParts);
    if (cand) {
      return cand;
    }
  }
}


/**
 * Resolves the ambiguous "foo.Bar" syntax into a complete Reflection for the given owner
 * Reflection, or void if not available in this project.
 * 
 * This is an improvement over TypeDoc's internal resolver as it:
 *   - allows arbitrary dividers between properties
 *   - descends into dup named calls and magic names
 *
 * This can return an ambiguous result, but TypeDoc's internal resolver is *already* ambiguous for
 * functions with multiple signatures.
 *
 * @param {typedocModels.Reflection} owner
 * @param {string} name
 * @return {typedocModels.Reflection|void}
 */
export function resolveLink(owner, name) {
  const idParts = name.split(/[^a-zA-Z0-9_]/g);
  let result = undefined;

  closest(owner, (cand) => {
    result = internalResolveChild(cand, idParts);
    return Boolean(result);
  });

  return result;
}


/**
 * Finds the closest parent Reflection that satisfies the caller.
 * 
 * @param {typedocModels.Reflection|void} reflection
 * @param {(cand: typedocModels.Reflection) => boolean} check
 * @return {typedocModels.Reflection|void}
 */
export function closest(reflection, check) {
  while (reflection) {
    if (check(reflection)) {
      return reflection;
    }
    reflection = reflection.parent;
  }
  return undefined;
}


/**
 * Generates the FQDN for this reflection.
 *
 * This is improved over TypeDoc's generation:
 *   - hides internal __call etc types
 *   - doesn't include the module/filename
 *
 * It's only useful for names within a specific project or module. Notably this works for Chrome
 * and friends because they declare a new global namespace, "chrome".
 *
 * @param {typedocModels.Reflection} reflection
 * @return {string}
 */
export function fullName(reflection) {
  /** @type {typedocModels.Reflection|undefined} */
  let r = reflection;

  const parts = [];
  while (r && r.kind !== rk.Module && r.kind !== rk.Project) {
    const {parent} = r;

    // Insert "~" when this looks at the type or call bridge. This only happens when we record
    // the properties of a type or arguments to a function. Chrome's docs historically don't report
    // this information, instead only providing information on top-level types.
    if (r.name.startsWith('__')) {
      if (!knownMagicNames.includes(r.name)) {
        throw new Error(`unknown magic: ${r.name}, ${reflection.getFullName()}`);
      }
      if (parts.length && parts[0] !== '~') {
        parts.unshift('~');
      }
    } else {
      // If we have a node with a leading "_", see if there's a matching parent without it.
      // This solves our awkward approach to escaping, which exports e.g., the real type
      // "_debugger" under a friendly alias "debugger".
      if (/^_\w/.test(r.name)) {
        const checkName = r.name.slice(1);
        const check = r.parent?.getChildByName(checkName);
        r = check ?? r;
      }

      if (r.name.length) {
        parts.unshift(r.name);
      }
    }

    // If this is the _type_ of a CallSignature, then skip over it (duplicate name).
    if (
      r.kind === rk.CallSignature &&
      (parent?.kind === rk.Function || parent?.kind === rk.Method)
    ) {
      if (r.name !== parent.name) {
        throw new TypeError(
          `signature did not match function: ${r.name} vs ${parent.name}`
        );
      }
      r = parent.parent;
      continue;
    }

    r = r.parent;
  }

  // We insert `~` instead of magic names, but it ends up being displayed as `.~.`. Fix that and
  // use the property delimiter.
  return parts.join('.').replace(/\.~\./g, propertyDelimiter).replace(/^\./, '');
}


/**
 * Finds the exported children of this Reflection.
 * 
 * @param {typedocModels.Reflection=} reflection
 * @param {typedocModels.ReflectionKind=} kindMask
 * @return {{[name: string]: typedocModels.DeclarationReflection}}
 */
export function exportedChildren(reflection, kindMask = 0) {
  /** @type {{[name: string]: typedocModels.DeclarationReflection}} */
  const all = {};

  if (!(reflection instanceof typedocModels.ContainerReflection)) {
    return all;
  }

  // TODO(samthor): The way we currently parse the .d.ts files _only_ generates exported types, and
  // they're not marked as such.
  // This might change in future.

  const arr = reflection.children ?? [];
  arr.sort(({name: a}, {name: b}) => a.localeCompare(b));

  for (const cand of arr) {
    if (kindMask && !(cand.kind & kindMask)) {
      continue;
    }
    all[cand.name] = cand;
  }

  return all;
}
