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


/**
 * @param {string} id
 * @return {string}
 */
export function last(id) {
  const index = id.lastIndexOf('.');
  if (index !== -1) {
    return id.substr(index + 1);
  }
  return id;
}


/**
 * @param {string} id
 * @return {string}
 */
export function parentId(id) {
  const dot = id.lastIndexOf('.');
  if (dot === -1) {
    return '';
  }
  return id.substr(0, dot);
}


/**
 * @param {string} id
 * @return {string}
 */
export function namespaceNameFromId(id) {
  if (!id.startsWith('api:')) {
    return '';
  }
  const leftDot = id.indexOf('.');
  if (leftDot === -1) {
    return id.substring(4);
  }
  return id.substring(4, leftDot);
}


export class TraverseContext {
  #filter;

  /**
   * @param {(spec: chromeTypes.TypeSpec, id: string) => boolean} filter
   */
  constructor(filter) {
    this.#filter = filter;
  }

  /**
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   */
  filter(spec, id) {
    return this.#filter(spec, id);
  }

  /**
   * @param {chromeTypes.SpecGroup} source
   * @param {string} parent
   * @param {(spec: chromeTypes.TypeSpec, id: string) => void} fn
   */
  forEach(source, parent, fn) {
    if (!source) {
      return;
    }

    if (Array.isArray(source)) {
      for (const p of source) {
        const cid = p.id ?? p.name;
        if (cid === undefined) {
          throw new Error(`bad property/param: ${JSON.stringify(p)} parent=${parent}`);
        }

        const childId = `${parent}.${cid}`;
        if (this.#filter(p, childId)) {
          fn(p, childId);
        }
      }
      return;
    }

    // Otherwise, this is a dict. Confirm the dictionary has matching IDs, if any.
    for (const name in source) {
      const p = source[name];
      const cid = p.id ?? p.name;

      if (cid !== undefined && cid !== name) {
        throw new Error(`bad property: parent dict ${name}, ${cid}`);
      }

      const childId = `${parent}.${name}`;
      if (this.#filter(p, childId)) {
        fn(p, childId);
      }
    }
  }

  /**
   * @param {chromeTypes.TypeSpec} source
   * @param {string} id
   */
  propertiesFor(source, id) {
    /** @type {{[id: string]: chromeTypes.TypeSpec}} */
    const out = {};

    this.forEach(source.properties, id, (prop, id) => {
      out[id] = prop;
    });

    return out;
  }

  /**
   * @param {chromeTypes.TypeSpec} spec of the function which itself has returns_async
   * @return {{
   *   withPromise: chromeTypes.TypeSpec,
   *   withCallback: chromeTypes.TypeSpec,
   * }=}
   */
  maybeExpandFunctionReturnsAsync(spec) {
    const { returns_async, ...clone } = spec;
    if (!returns_async) {
      return undefined;
    }
    if (spec.returns) {
      throw new Error(`got returns_async and returns on function spec: ${JSON.stringify(spec)}`);
    }

    const asyncParameters = returns_async.parameters ?? [];
    if (asyncParameters.length > 1) {
      throw new Error(`returns_async with too many params: ${JSON.stringify(spec.returns_async)}`);
    }
    if (spec.returns) {
      throw new Error(`returns_async with additional returns option: ${JSON.stringify(spec)}`);
    }

    // This can be undefined, which is fine: treated as void for the Promise type.
    let singleReturnsAsyncParam = asyncParameters[0] ?? { type: 'void' };

    // HACK: An optional param here is included on the Promise too.
    if (singleReturnsAsyncParam?.optional) {
      singleReturnsAsyncParam = {
        choices: [singleReturnsAsyncParam, { type: 'undefined' }],
      };
    }

    return {
      withPromise: {
        ...clone,
        returns: {
          $ref: 'Promise',
          value: [
            'return',
            singleReturnsAsyncParam,
          ],
        },
      },
      withCallback: {
        ...clone,
        parameters: [...spec.parameters ?? [], returns_async],
      },
    };
  }

  /**
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   * @return {[chromeTypes.NamedTypeSpec, ...chromeTypes.NamedTypeSpec[]][]}
   */
  expandFunctionParams(spec, id) {
    // If this is actually a Promise-supporting API, then we call ourselves again to support both
    // callback and Promise-based versions.
    const expanded = this.maybeExpandFunctionReturnsAsync(spec);
    if (expanded) {
      return [
        ...this.expandFunctionParams(expanded.withPromise, id),
        ...this.expandFunctionParams(expanded.withCallback, id),
      ];
    }

    const params = (spec.parameters ?? []).filter((spec) => {
      if (!spec.name) {
        throw new Error(`function parameter missing name: ${JSON.stringify(spec)} id=${id}`);
      }
      return this.#filter(spec, `${id}.${spec.name}`);
    });

    // This always includes the return value in the 0th position.
    /** @type {[chromeTypes.NamedTypeSpec, ...chromeTypes.NamedTypeSpec[]][]} */
    const expansions = [];

    let seenNonOptional = false;

    /** @type {number[]} */
    const optionalPositionsLeft = [];

    // Working backwards, find all optional positions found at a lower index than required ones.
    // For example, in (req, opt, req, opt), the result array will be [1] as the first required
    // argument is at 2.
    for (let i = params.length - 1; i >= 0; --i) {
      const p = params[i];
      if (!p.optional) {
        seenNonOptional = true;
        continue;
      }
      if (!seenNonOptional) {
        continue;
      }
      params[i] = { ...p };
      delete params[i].optional;
      optionalPositionsLeft.unshift(i);
    }

    // Walk through all options 0-(2 ** positions). For the boring case, this will just be one, and
    // no bits will be set (value zero). For complex cases, this will enumerate through all possible
    // optional arguments, enabling and disabling them as necessary.
    const target = 1 << optionalPositionsLeft.length;

    for (let i = 0; i < target; ++i) {
      /** @type {(chromeTypes.TypeSpec?)[]} */
      const work = params.slice();
      for (let j = 0; j < optionalPositionsLeft.length; ++j) {
        const bit = 1 << j;
        if (i & bit) {
          const index = optionalPositionsLeft[j];
          work[index] = null;
        }
      }

      // Ensure that there's a return type, or fall back to `void`.
      // Even if this has a name, we call it 'return'.
      const result = /** @type {chromeTypes.NamedTypeSpec[]} */ (work.filter((x) => x !== null));
      const returns = spec.returns ?? { type: 'void' };
      expansions.push([{ ...returns, name: 'return' }, ...result]);
    }

    return expansions;
  }
}
