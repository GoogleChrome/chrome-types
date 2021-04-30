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


import {convertFunctionToPromise, expandParameters, filterEvent} from './helper.js';
import * as types from '../../types/index.js';


export class Node {
  name;

  /**
   * This should contain the a sparse feature between this node's canonicalFeature and its parent.
   * For Namespaces, this will be the same as canonicalFeature.
   *
   * @type {Partial<types.Feature>}
   */
  feature = {};

  /** @type {Partial<types.Feature>} */
  canonicalFeature = {};

  /** @type {boolean} */
  nodoc = false;

  /** @type {string=} */
  description;

  /** @type {string=} */
  deprecated;

  /**
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
  }
}


export class Property extends Node {
  type;

  /** @type {boolean} */
  optional = false;

  /** @type {boolean} */
  isType = false;

  /**
   * @param {Type} type
   * @param {string} name
   */
  constructor(type, name) {
    super(name);
    this.type = type;
  }

  clone() {
    const prop = new Property(this.type, this.name);
    Object.assign(prop, this);
    return prop;
  }

  /**
   * @param {(path: string[], prop: Property) => (boolean|undefined)} fn
   * @param {string[]} path
   * @return {boolean} if this Property should be removed (and no children were walked)
   */
  traverse(fn, path = []) {
    path = path.concat(this.name);
    if (fn(path, this)) {
      return true;
    }

    for (const t of this.type.allTypes()) {
      t.traverse(fn, path);
    }
    return false;
  }
}


export class Namespace extends Node {

  /** @type {{[name: string]: Property}} */
  all = {};

  /**
   * @param {string} name
   */
  constructor(name) {
    super(name);
  }

  /**
   * @param {(prop: Property) => boolean} fn
   * @return {Property[]}
   */
  #filterBy = (fn) => {
    const v = Object.values(this.all).filter(fn);
    v.sort(({name: a}, {name: b}) => a.localeCompare(b));
    return v;
  };

  get types() {
    return this.#filterBy((prop) => prop.isType);
  }

  get properties() {
    return this.#filterBy((prop) => {
      if (prop.isType || prop.type instanceof FunctionType) {
        return false;
      }
      return !filterEvent(prop);
    });
  }

  get methods() {
    return this.#filterBy((prop) => prop.type instanceof FunctionType);
  }

  get events() {
    return this.#filterBy(filterEvent);
  }

  /**
   * Traverse all child properties in this namespace. Does not traverse the namespace itself.
   *
   * If the passed function returns `true` for any {@link Property}, then it will be removed.
   *
   * @param {(path: string[], prop: Property) => (boolean|undefined)} fn
   */
  traverse(fn) {
    const path = [this.name];

    for (const name of Object.keys(this.all)) {
      const prop = this.all[name];
      if (prop.traverse(fn, path)) {
        delete this.all[name];
      }
    }
  }
}


/**
 * Top-level type class.
 */
export class Type {
  key;

  /**
   * @param {string} key
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * @param {(path: string[], prop: Property) => (boolean|undefined)} fn
   * @param {string[]} path
   */
  traverse(fn, path = []) {
    // do nothing by default
  }

  /**
   * @return {Type[]}
   */
  allTypes() {
    return [this];
  }
}


export class PrimitiveType extends Type {
  primitiveType;

  /**
   * @param {string} primitiveType 
   */
  constructor(primitiveType) {
    super('primitive');
    this.primitiveType = primitiveType;
  }
}


export class LiteralType extends Type {
  value;

  get primitiveType() {
    return typeof this.value === 'string' ? 'string' : 'number';
  }

  /**
   * @param {string|number} value 
   */
  constructor(value) {
    super('literal');

    const t = typeof value;
    if (!['number', 'string'].includes(t)) {
      throw new Error(`got invalid literal: ${value}`);
    }

    this.value = value;
  }
}


export class NumberPrimitiveType extends PrimitiveType {
  isFloat;
  minimum;
  maximum;

  /**
   * @param {boolean} isFloat
   * @param {number=} minimum
   * @param {number=} maximum
   */
  constructor(isFloat, minimum, maximum) {
    super('number');
    this.isFloat = isFloat;
    this.minimum = minimum;
    this.maximum = maximum;
  }
}


export class RefType extends Type {
  name;
  internal;
  templates;

  /**
   * @param {string} name
   * @param {boolean} internal
   * @param {Type[]=} templates
   */
  constructor(name, internal = false, templates = []) {
    super('ref');
    this.name = name;
    this.internal = internal;
    this.templates = templates;
  }

  /**
   * @return {Type[]}
   */
  allTypes() {
    return [this, ...this.templates];
  }
}


export class SequenceType extends Type {
  itemType;
  minItems;
  maxItems;

  /**
   * @param {Type} itemType 
   * @param {number=} minItems 
   * @param {number=} maxItems 
   */
  constructor(itemType, minItems, maxItems) {
    super('sequence');
    this.itemType = itemType;
    this.minItems = Math.max(0, minItems ?? 0);
    this.maxItems = maxItems;

    if (typeof this.maxItems === 'number' && this.maxItems < this.minItems) {
      throw new Error(`sequence got max < min`);
    }
  }

  /**
   * @return {Type[]}
   */
   allTypes() {
    return [this, this.itemType];
  }
}


export class ObjectType extends Type {
  properties;
  additionalProperties;

  /** @type {Property[]} */
  templates = [];

  /** @type {'' | 'instanceType'} */
  special = '';

  /**
   * @param {{[name: string]: Property}} properties
   * @param {Type?} additionalProperties
   */
  constructor(properties, additionalProperties = null) {
    super('object');
    this.properties = properties;
    this.additionalProperties = additionalProperties;
  }

  /**
   * @param {(path: string[], prop: Property) => (boolean|undefined)} fn
   * @param {string[]} path
   */
  traverse(fn, path = []) {
    for (const name of Object.keys(this.properties)) {
      const prop = this.properties[name];
      if (prop.traverse(fn, path)) {
        delete this.properties[name];
      }
    }
  }

  /**
   * @return {Type[]}
   */
  allTypes() {
    if (this.additionalProperties) {
      return [this, this.additionalProperties];
    }
    return super.allTypes();
  }
}


export class UnionType extends Type {
  types;

  /**
   * @param {Type[]} types
   */
   constructor(types) {
    super('union');
    this.types = types;
  }

  /**
   * @return {Type[]}
   */
  allTypes() {
    return [this, ...this.types];
  }
}


export class ChoicesType extends Type {
  choices;

  /**
   * @param {Type[]} choices
   */
  constructor(choices) {
    super('choices');
    this.choices = choices;
  }

  /**
   * @return {Type[]}
   */
  allTypes() {
    return [this, ...this.choices];
  }
}


export class FunctionType extends Type {

  /** @type {Property[]} */
  parameters;

  /** @type {Property} */
  returnProperty;

  /** @type {boolean} */
  isReturnsAsync = false;

  /**
   * @param {Property[]} parameters
   * @param {Property|Type} returns
   * @param {boolean} isReturnsAsync
   */
  constructor(parameters = [], returns = voidType, isReturnsAsync = false) {
    super('function');
    this.parameters = parameters.slice();

    if (isReturnsAsync) {
      this.returnProperty = new Property(voidType, 'return');

      const callbackProperty = returns instanceof Type ? new Property(returns, 'callback') : returns;
      if (callbackProperty.name !== 'callback') {
        throw new Error(`got async function without callback type: ${callbackProperty.name}`);
      }
      this.parameters.push(callbackProperty);
      this.isReturnsAsync = true;
    } else {
      if (returns instanceof Property && returns.name !== 'return') {
        throw new Error(`got return property with unexpected name: ${returns.name}`);
      }

      const returnProperty = returns instanceof Type ? new Property(returns, 'return') : returns;
      this.returnProperty = returnProperty;
    }
  }

  /**
   * @param {(path: string[], prop: Property) => (boolean|undefined)} fn
   * @param {string[]} path
   */
  traverse(fn, path = []) {
    this.parameters = this.parameters.filter((param) => {
      // If traverse returns false or undefined, keep the parameter.
      return !param.traverse(fn, path);
    });

    // Otherwise, only announce a return property if it's not void.
    const t = this.returnType;
    if (t instanceof PrimitiveType && t.primitiveType === 'void') {
      return;
    }
    this.returnProperty.traverse(fn, path);
  }

  get parametersForAsync() {
    if (!this.isReturnsAsync) {
      return [];
    }
    const s = this.parameters.slice();
    s.pop();
    return s;
  }

  get callbackForAsync() {
    if (!this.isReturnsAsync) {
      return null;
    }
    return this.parameters[this.parameters.length - 1];
  }

  get returnType() {
    return this.returnProperty.type;
  }

  get returnTypeForAsync() {
    if (!this.isReturnsAsync) {
      return voidType;
    }

    const callback = this.parameters[this.parameters.length - 1];
    if (!callback) {
      throw new Error(`missing callback for async return type`);
    }

    return convertFunctionToPromise(callback.type);
  }

  get returnPropertyForAsync() {
    return new Property(this.returnTypeForAsync, 'return');
  }

  singleExpansion() {
    /** @type {Property[]=} */
    let parametersArray;
    this.forEach((...parameters) => {
      if (parametersArray) {
        throw new Error(`got multiple expansions`);
      }
      parametersArray = parameters;
    });

    if (parametersArray === undefined) {
      throw new Error(`got no expansions`);
    }

    return parametersArray;
  }

  get expansions() {
    /** @type {Property[][]} */
    const all = [];
    this.forEach((...p) => all.push(p));
    return all;
  }

  /**
   * @param {(returns: Property, ...parameters: Property[]) => void} fn
   */
  forEach(fn) {
    /** @type {Property[][]} */
    let expansions;
    const parameters = this.parameters.slice();

    if (this.isReturnsAsync) {
      // Expand as a callback first. This is already part of the parameters.
      expansions = expandParameters(this.returnProperty, parameters);

      // Pop the last property (callback) and run as Promise.
      const callbackProperty = parameters.pop();
      if (!callbackProperty || callbackProperty.name !== 'callback') {
        throw new Error(`expected last arg to calback function to be callback, was: ${callbackProperty?.name}`);
      }
      const promiseType = convertFunctionToPromise(callbackProperty.type);
      const promiseProperty = new Property(promiseType, 'return');
      expansions.unshift(...expandParameters(promiseProperty, parameters));
    } else {
      expansions = expandParameters(this.returnProperty, parameters);
    }

    expansions.forEach((data) => fn(data[0], ...data.slice(1)));
  }
}


export const voidType = new PrimitiveType('void');
export const requiredTemplateType = new Type('__template');
