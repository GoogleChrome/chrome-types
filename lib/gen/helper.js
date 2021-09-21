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
import * as model from './model.js';


/**
 * @param {model.Namespace} namespace
 * @param {string[]} allNamespaceNames
 * @return {string[]}
 */
export function findDependentNamespaces(namespace, allNamespaceNames) {
  /** @type {string[]} */
  const deps = [];

  /**
   * @param {model.RefType} ref
   */
  const checkRef = (ref) => {
    if (!ref.internal) {
      // We've already guessed that this is external, skip.
      return;
    }

    const parts = ref.name.split('.');
    const lastPart = parts.pop();  // pop the name itself
    if (parts.length === 0) {
      // This is a single type name, so it cannot be from another namespace.
      return;
    }

    // Walk backwards over parts until we find a match.
    // This isn't perfect but gives us a pretty good idea.
    for (let i = parts.length; i > 0; --i) {
      const check = parts.slice(0, i).join('.');
      if (!allNamespaceNames.includes(check)) {
        continue;
      }
      if (!deps.includes(check)) {
        deps.push(check);
      }
      return;
    }
  };

  namespace.traverse((_path, prop) => {
    const types = prop.type.allTypes();

    types.forEach((type) => {
      if (type instanceof model.RefType) {
        checkRef(type);
      }
    })
  });

  deps.sort();
  return deps;
}


/**
 * @param {model.Type} fn
 */
export function convertFunctionToPromise(fn) {
  if (!(fn instanceof model.FunctionType)) {
    throw new Error('expected simple FunctionType for ReturnsAsync');
  }

  const parametersArray = fn.singleExpansion();
  const returnsProperty = parametersArray.shift();
  if (!returnsProperty) {
    throw new Error(`missing return type?!`);
  }
  const returnsType = returnsProperty.type;
  if (!(returnsType instanceof model.PrimitiveType) || returnsType.primitiveType !== 'void') {
    throw new Error(`can't convert non-returns-void func to Promise: ${returnsType}`);
  }

  /** @type {model.Type} */
  let promiseType;

  switch (parametersArray.length) {
    case 0:
      promiseType = model.voidType;
      break;
    case 1:
      // Even though this has a name, it's returned directly in the Promise.
      promiseType = parametersArray[0].type;
      break;
    default:
      throw new Error(`returns_async has ${parametersArray.length} args, expected 0/1`);
  }

  return new model.RefType('Promise', false, [promiseType]);
}


/**
 * @param {model.Property} returns
 * @param {model.Property[]} parameters
 * @return {types.Tag[]}
 */
export function tagsForParameters(returns, parameters) {
  const tags = parameters.map((p) => {
    let value = p.name;
    if (p.description) {
      value += ` ${p.description}`;
    }
    return {name: 'param', value};
  });

  if (returns.description) {
    tags.push({name: 'returns', value: returns.description});
  }

  return tags;
}


/**
 * This expands the parameters into a list of expanded parameters for left-optional arguments. This
 * clones properties when they are required to be changed.
 *
 * This removes parameters which are nodoc, which are not visible to user code.
 *
 * @param {model.Property} returns
 * @param {model.Property[]} parameters
 * @return {model.Property[][]}
 */
export function expandParameters(returns, parameters) {
  parameters = parameters.filter((p) => !p.nodoc);

  // This should probably never happen.
  if (returns.nodoc) {
    returns = returns.clone();
    returns.type = model.voidType;
  }

  let seenNonOptional = false;

  /** @type {number[]} */
  const optionalPositionsLeft = [];

  /** @type {model.Property[][]} */
  const expansions = [];

  // Working backwards, find all optional positions found at a lower index than required ones. For
  // example, for (req, opt, req, opt), the result array will be [1] as the first required argument
  // is at 2.
  for (let i = parameters.length - 1; i >= 0; --i) {
    const p = parameters[i];
    if (!p.optional) {
      seenNonOptional = true;
      continue;
    }
    if (!seenNonOptional) {
      continue;
    }

    const clone = p.clone();
    clone.optional = false;
    parameters[i] = clone;

    optionalPositionsLeft.unshift(i);
  }

  // Walk through all options 0-(2 ** positions). For the boring case, this will just be one, and
  // no bits will be set (value zero). For complex cases, this will enumerate through all possible
  // optional arguments, enabling and disabling them as necessary.
  const target = 1 << optionalPositionsLeft.length;

  for (let i = 0; i < target; ++i) {
    /** @type {(model.Property?)[]} */
    const work = parameters.slice();
    for (let j = 0; j < optionalPositionsLeft.length; ++j) {
      const bit = 1 << j;
      if (i & bit) {
        const index = optionalPositionsLeft[j];
        work[index] = null;
      }
    }

    const result = /** @type {model.Property[]} */ (work.filter((x) => x !== null));
    result.unshift(returns);
    expansions.push(result);
  }

  return expansions;
}


/**
 * @param {model.Property} prop
 * @return {boolean}
 */
export function filterEvent(prop) {
  if (!(prop.type instanceof model.RefType)) {
    return false;
  }
  const name = prop.type.name;
  return ['Event', 'events.Event', 'chrome.events.Event'].includes(name);
}