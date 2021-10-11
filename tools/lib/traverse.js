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
    const dict = flatten(source, parent);
    for (const id in dict) {
      const o = dict[id];
      if (this.#filter(o, id)) {
        fn(o, id);
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

    this.forEach(source.events, id, (prop, id) => {
      const eprop = /** @type {chromeTypes.EventSpec} */ (prop);
      const { returns, parameters, type, options, ...outer } = eprop;

      if (options?.supportsListeners === false) {
        if (!options.conditions?.length || !options.actions?.length) {
          throw new Error(`invalid declarative event: ${JSON.stringify(prop)}`);
        }

        // Look for the left part, e.g. "api:declarativeContent.onPageChanged" =>
        // "declarativeContent". The strings we get from Chrome's source code start with this, even
        // though it's redundant.
        const namespaceName = namespaceNameFromId(id);
        if (!namespaceName) {
          throw new Error(`could not find left part: ${id}`);
        }
        /** @type {(s: string[]) => chromeTypes.TypeSpec[]} */
        const toRef = (s) => {
          return s.map((raw) => {
            if (raw.startsWith(namespaceName + '.')) {
              raw = raw.substr(namespaceName.length + 1);
            }
            return { $ref: raw };
          });
        };

        out[id] = {
          $ref: 'events.Event',
          value: [
            last(id),
            { type: 'void' },
            { choices: toRef(options.conditions) },
            { choices: toRef(options.actions) },
          ],
        };
        return;
      }

      /** @type {chromeTypes.TypeSpec} */
      const inner = {
        type: 'function',
      };
      if (returns) {
        inner.returns = returns;
      }
      if (parameters) {
        inner.parameters = parameters;
      }

      out[id] = {
        ...outer,
        $ref: 'events.Event',
        value: [last(id), inner],
      };
    });

    return out;
  }

  /**
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   * @return {[chromeTypes.TypeSpec, ...chromeTypes.TypeSpec[]][]}
   */
  expandFunctionParams(spec, id) {
    const params = (spec.parameters ?? []).filter((spec, i) => {
      const name = spec.name || `_${i}`;
      return this.#filter(spec, `${id}.${name}`);
    });

    // This always includes the return value in the 0th position.
    /** @type {[chromeTypes.TypeSpec, ...chromeTypes.TypeSpec[]][]} */
    const expansions = [];

    // If this is actually a Promise-supporting API, then we call ourselves again to support both
    // callback and Promise-based versions.
    if (spec.returns_async) {
      const asyncParameters = spec.returns_async.parameters ?? [];
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
          choices: [ singleReturnsAsyncParam, { type: 'undefined' } ],
        };
      }

      // Call ourselves again without `returns_async`, so we can use the `Promise` return type.
      // Replace the 0th result with a Promise.
      const { returns_async: _, ...clone } = spec;
      const promisified = this.expandFunctionParams(clone, id);

      for (const out of promisified) {
        if (out[0].type !== 'void') {
          throw new Error(`can't promisify returns_async, got non-void ret: ${JSON.stringify(out)}`);
        }
        out[0] = {
          $ref: 'Promise',
          value: [
            'return',
            singleReturnsAsyncParam,
          ],
        }
      }
      expansions.push(...promisified);

      // Push this as a callback and continue execution so we get all options.
      params.push(spec.returns_async);
    }

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
      const result = /** @type {chromeTypes.TypeSpec[]} */ (work.filter((x) => x !== null));
      expansions.push([
        spec.returns ?? { type: 'void' },
        ...result,
      ]);
    }

    return expansions;
  }
}


/**
 * Flatten an array or dictionary into a common dictionary of type instances, all with a nested ID
 * based on the passed parent ID. Supports an empty/undefined source.
 *
 * @param {{[name: string]: chromeTypes.TypeSpec} | chromeTypes.TypeSpec[] | undefined} source
 * @param {string} parent
 */
export function flatten(source, parent) {
  if (!source) {
    return {};
  }

  /** @type {{[name: string]: chromeTypes.TypeSpec}} */
  const dict = {};

  // Convert an array to the dictionary form instead. Expect name/id to appear on every element.
  if (Array.isArray(source)) {
    for (const p of source) {
      const cid = p.id ?? p.name;
      if (cid === undefined) {
        throw new Error(`bad property: ${cid} parent=${parent}`);
      }
      dict[`${parent}.${cid}`] = p;
    }
    return dict;
  }

  // Confirm the dictionary has matching IDs, if any.
  for (const name in source) {
    const p = source[name];
    const cid = p.id ?? p.name;

    if (cid !== undefined && cid !== name) {
      throw new Error(`bad property: parent dict ${name}, ${cid}`);
    }

    dict[`${parent}.${name}`] = p;
  }

  return dict;
}
