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
import { propertyOverride } from './override.js';
import { Features, parentName, sparseFeature } from '../features/helpers.js';
import { buildNamespaceAwareMarkdownRewrite } from '../comment.js';


/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
const extendPath = (a, b) => {
  if (!b) {
    throw new Error(`missing extension for ${a}`);
  }
  return `${a}.${b}`;
};


const emptyNamespace = new model.Namespace('');


export class JSONSchemaParser {
  #commentRewriter;
  #features;
  #namespace = emptyNamespace;

  /**
   * @param {Features} f
   * @param {string[]} allNamespaceNames
   */
  constructor(f, allNamespaceNames) {
    this.#features = f;
    this.#commentRewriter = buildNamespaceAwareMarkdownRewrite(allNamespaceNames);
  }

  /**
   * Remove a leading "namespaceName." from any passed ID.
   *
   * @param {string} raw
   * @return {string}
   */
  #unresolveName = (raw) => {
    const n = this.#namespace.name;
    if (raw.startsWith(n)) {
      if (raw[n.length] === '.') {
        return raw.substr(n.length + 1);
      }
    }
    return raw;
  };

  /**
   * @param {string} raw
   * @param {model.Type[]} templates
   * @return {model.RefType}
   */
  #buildInternalRef = (raw, templates = []) => {
    raw = this.#unresolveName(raw);

    // Catch some cases where types start with a number.
    if (raw.match(/^\d/)) {
      raw = `_${raw}`;
    }

    return new model.RefType(raw, true, templates);
  };

  /**
   * Parse a list of strings which are actually references to other concrete types. These are found
   * inside the definitions of declarative event listeners.
   *
   * @param {string[]} raw
   * @return {model.ChoicesType}
   */
  #parseRefArray = (raw) => {
    return new model.ChoicesType(raw.map((r) => this.#buildInternalRef(r)));
  };

  /**
   * @param {string} path
   * @param {{[name: string]: types.RawType}|undefined} raw
   */
  #parseRawProperties = (path, raw) => {
    /** @type {{[name: string]: model.Property}} */
    const properties = {};

    const r = raw ?? {};
    for (const name in r) {
      const prop = this.#parseProperty(path, r[name], name);
      prop.name = name;
      properties[name] =  prop;
    }

    return properties;
  };

  /**
   * @param {string} path
   * @param {(types.RawType & {type: 'function'})[]|undefined} events
   * @return {model.Property[]}
   */
  #parseRawEvents = (path, events) => {
    return (events ?? []).map((f) => {
      if (!f.name) {
        throw new Error(`got event of object without name`);
      }
      const extendedPath = extendPath(path, f.name);
      const options = f.options ?? {};

      // Start this with a void template type, and replace as we go along.
      const eventType = new model.RefType('events.Event', true, [model.voidType]);
      const prop = new model.Property(eventType, f.name);
      this.#extendProperty(prop, f);

      if (options.supportsListeners === false) {
        // This is a declarative API, so add conditions and rules here. The conditions and actions
        // refs are actually classes as they'll have a property of "instanceType".

        if (options.conditions?.length) {
          eventType.templates.push(this.#parseRefArray(options.conditions));
        }

        if (options.actions?.length) {
          if (!options.conditions?.length) {
            eventType.templates.push(model.voidType);
          }
          eventType.templates.push(this.#parseRefArray(options.actions));
        }
      } else {
        if (options.conditions?.length || options.actions?.length) {
          throw new Error(`found event at ${path} with both listeners/declarative`);
        }

        // HACK: Some event handlers have an optional 0th argument, even though this makes no sense.
        // Fix it for them.
        const p = f.parameters ?? [];
        if (p.length >= 2 && p[0].optional && !p[1].optional) {
          p[0] = Object.assign({}, p[0], {optional: false});
        }

        const functionType = this.#parseType(extendedPath, f, 'function');
        eventType.templates[0] = functionType;
      }

      prop.type = propertyOverride(extendedPath, prop) ?? prop.type;
      return prop;
    });
  };

  /**
   * @param {string} path
   * @param {types.RawType} raw
   * @param {string=} overrideName
   * @param {string=} fallbackType
   * @return {model.Property}
   */
  #parseProperty = (path, raw, overrideName, fallbackType) => {
    let name = overrideName ?? raw.name ?? raw.id;
    if (name === undefined) {
      throw new Error(`could not parse property, no name`);
    }

    // Fix invalid names that start with numbers.
    if (name.match(/^\d/)) {
      name = `_${name}`;
    }

    const extendedPath = extendPath(path, name);
    const type = this.#parseType(extendedPath, raw, fallbackType);

    const d = new model.Property(type, name);

    this.#extendProperty(d, raw, name);

    // HACK: We make all InstanceType instances visible.
    if (name.endsWith('InstanceType') &&
        type instanceof model.ChoicesType &&
        type.choices.length === 1 &&
        type.choices[0] instanceof model.LiteralType) {
      d.nodoc = false;
    }

    d.type = propertyOverride(extendedPath, d) ?? d.type;
    return d;
  };

  /**
   * @param {model.Property} prop
   * @param {types.RawType} raw
   * @param {string=} name
   */
  #extendProperty = (prop, raw, name = raw.name) => {
    prop.optional = raw.optional ?? false;
    prop.nodoc = Boolean(raw.nodoc);

    if (raw.description) {
      prop.description = this.#parseComment(raw.description);
    }
    if (raw.deprecated) {
      prop.deprecated = this.#parseComment(raw.deprecated);
    }

    prop.isType = (raw.id === name);
  };

  /**
   * Builds an anonymous type from the passed definition in JSON.
   *
   * This does not include how the type is used (e.g., 'name' or 'optional'): this allows us to
   * reprsent anonymous object types or parameters.
   *
   * @param {string} path
   * @param {types.RawType} raw
   * @param {string=} fallbackType
   * @return {model.Type}
   */
  #parseType = (path, raw, fallbackType) => {
    // TODO: preserveNull?

    if (raw.choices) {
      const c = raw.choices.map((r) => this.#parseType(path, r));
      return new model.ChoicesType(c);
    }

    if (raw.enum) {
      const allowedEnums = ['string', 'integer'];
      if (!allowedEnums.includes(raw.type ?? '')) {
        throw new Error(`got invalid enum type: ${raw.type}`);
      }

      // TODO(samthor): If raw.enum contains structured objects, then it's likely they also have
      // comments for each enum value. We don't have a great way to represent these right now.
      const c = raw.enum.map((s) => new model.LiteralType(typeof s === 'object' ? s.name : s));
      return new model.ChoicesType(c);
    }

    // This is an internal reference. We currently just store it as a string rather than correctly
    // wiring it up.
    if (raw.$ref) {
      const templates = [];

      // Finds `value: [name, rawType]` to mean template type here.
      if (raw.value) {
        if (!(raw.value instanceof Array)) {
          throw new Error(`ref got non-array value: ${raw.value}`);
        }

        // TODO(samthor): should this include the name? It's in JSON.
        const length = raw.value.length;
        if (length === 2) {
          const template = this.#parseType(path, raw.value[1]);
          templates.push(template);
        } else if (length > 2) {
          throw new Error(`unexpected value length >2`);
        }
      }

      const refType = this.#buildInternalRef(raw.$ref, templates);

      // HACK: This happens in chrome.storage, which has references that also have extra properties.
      const properties = this.#parseRawProperties(path, raw.properties);
      if (Object.keys(properties).length > 0) {
        const objectType = new model.ObjectType(properties);
        return new model.UnionType([refType, objectType]);
      }

      return refType;
    }

    // This is an external web type, e.g., Window.
    if (raw.isInstanceOf) {
      return new model.RefType(raw.isInstanceOf, false);
    }

    if (raw.value) {
      if (typeof raw.value === 'string' || typeof raw.value === 'number') {
        const v = /** @type {string|number} */ (raw.value);

        // TODO(samthor): This can technically be a float OR an integer value if a number.
        // There's also a "HACK" in model.py related to this value.
        return new model.LiteralType(v);
      }

      // This should be caught above under $ref.
      if (Array.isArray(raw.value)) {
        throw new Error(`got template value without $ref`);
      }

      // The empty dictionary is seen for properties immediately implementing types.
      if (raw.type !== 'object') {
        throw new Error(`got object value without being an object`)
      }
    }

    let effectiveType = raw.type ?? fallbackType;
    if (raw.parameters && effectiveType === undefined) {
      effectiveType = 'function';
    }

    switch (effectiveType) {
      case 'array': {
        let itemType;
        if (!raw.items) {
          // HACK: This happens for some old data, and assumes number.
          itemType = new model.PrimitiveType('number');
        } else {
          itemType = this.#parseType(path, raw.items);
        }
        return new model.SequenceType(itemType, raw.minItems, raw.maxItems);
      }

      case 'double':
      case 'number':
      case 'integer': {
        // Double and number both mean floats, but TypeScript doesn't represent them.
        const isFloat = (effectiveType !== 'integer');
        return new model.NumberPrimitiveType(isFloat, raw.minimum, raw.maximum);
      }

      case 'int64':
        // Not sure if this occurs.
        return new model.PrimitiveType('bigint');

      case 'binary':
        // This is basically just an external ref to ArrayBuffer. This type may predate ArrayBuffer
        // being added to Chrome.
        return this.#parseType(path, {'isInstanceOf': 'ArrayBuffer'});

      case 'boolean':
      case 'any':
      case 'string':
        return new model.PrimitiveType(effectiveType);

      case 'object': {
        const properties = this.#parseRawProperties(path, raw.properties);

        (raw.functions ?? []).forEach((f) => {
          if (!f.name) {
            throw new Error(`got function of object without name`);
          }
          properties[f.name] = this.#parseProperty(path, f, undefined, 'function');
        });

        // HACK: Look for class definitions.
        /** @type {model.ObjectType['special']} */
        let special = '';
        const instanceTypeProperty = properties['instanceType'];
        if (instanceTypeProperty && instanceTypeProperty.type instanceof model.RefType) {
          instanceTypeProperty.nodoc = false;
          instanceTypeProperty.description = undefined;
          special = 'instanceType';
        }

        const events = this.#parseRawEvents(path, raw.events);
        events.forEach((eventProperty) => {
          if (!eventProperty.name) {
            throw new Error(`expected event name`);
          }
          properties[eventProperty.name] = eventProperty;
        });

        const additionalProperties =
            raw.additionalProperties ? this.#parseType(path, raw.additionalProperties) : null;
        const out = new model.ObjectType(properties, additionalProperties);
        out.special = special;
        return out;
      }

      case 'function': {
        const parameters = (raw.parameters ?? []).map((r) => this.#parseProperty(path, r));

        if (raw.returns && raw.returns_async) {
          throw new Error(`function had both returns and returns_async`);
        }
        const isReturnsAsync = Boolean(raw.returns_async);

        let returnProperty = new model.Property(model.voidType, 'return');

        if (raw.returns) {
          returnProperty = this.#parseProperty(path, raw.returns, 'return');
        } else if (raw.returns_async) {
          if (!raw.returns_async.name) {
            throw new Error(`got returnsAsync without name`);
          }
          // We expect the `returns_async` to be called "callback", so just override it here.
          returnProperty = this.#parseProperty(path, raw.returns_async, 'callback');
        }

        return new model.FunctionType(parameters, returnProperty, isReturnsAsync);
      }
    }

    console.warn('raw', raw);
    throw new Error(`unsupported type: ${effectiveType}`);
  };

  /**
   * @param {types.RawNamespace} raw
   */
  #parseNamespace = (raw) => {
    const namespace = this.#namespace;
    const path = namespace.name;
  
    const all = this.#parseRawProperties(path, raw.properties);
  
    (raw.functions ?? []).forEach((f) => {
      const prop = this.#parseProperty(path, f, undefined, 'function');
      if (!prop.name) {
        throw new Error(`function without name`);
      }
      all[prop.name] = prop;
    });
  
    (raw.types ?? []).forEach((f) => {
      // HACK: declarativeWebRequest duplicates its own name in its types.
      if (f.id) {
        f.id = this.#unresolveName(f.id);
      }

      const prop = this.#parseProperty(path, f);
      if (!prop.name) {
        throw new Error(`type without id`);
      }
      prop.isType = true;
      all[prop.name] = prop;
    });
  
    const events = this.#parseRawEvents(path, raw.events);
    events.forEach((eventProperty) => {
      if (!eventProperty.name) {
        throw new Error(`expected event name`);
      }
      all[eventProperty.name] = eventProperty;
    });
  
    namespace.all = all;
  };

  /**
   * Parse a raw comment from Chrome's source into Markdown.
   *
   * @param {string} raw
   * @return {string}
   */
  #parseComment = (raw) => {
    return this.#commentRewriter(this.#namespace.name, raw);
  };

  /**
   * @param {types.RawNamespace} raw
   * @return {{
   *   namespace: model.Namespace,
   *   byPath: {[path: string]: model.Property},
   * }}
   */
  parse(raw) {
    const namespace = new model.Namespace(raw.namespace);

    // HACK: We see 'none' as a description, which clearly is intended to be blank/empty.
    if (raw.description !== 'none') {
      namespace.description = this.#parseComment(raw.description ?? '');
    }
    if (raw.deprecated) {
      namespace.deprecated = this.#parseComment(raw.deprecated);
    }
    namespace.nodoc = Boolean(raw.nodoc);

    try {
      this.#namespace = namespace;
      this.#parseNamespace(raw);

      const namespaceFeature = this.#features.query(`api:${namespace.name}`);
      if (!namespaceFeature) {
        namespace.nodoc = true;
      } else {
        namespace.feature = namespaceFeature;
        namespace.canonicalFeature = namespaceFeature;
      }

      /** @type {{[path: string]: model.Property}} */
      const byPath = {};

      // Augment or hide every property within this namespace.
      namespace.traverse((pathParts, prop) => {
        const path = pathParts.join('.');
        byPath[path] = prop;

        const parentPath = parentName(path);

        // Awkwardly get the parent Node either from the dictionary OR from the namespace name.
        /** @type {model.Node=} */
        const parentNode = byPath[parentPath] ?? (parentPath === namespace.name ? namespace : undefined);
        if (!parentNode) {
          throw new Error(`could not get parentNode for: ${path}`);
        }

        // If the parent is deprecated, mark this as deprecated too. It's transitive.
        if (parentNode.deprecated !== undefined && prop.deprecated === undefined) {
          prop.deprecated = '';
        }

        // If we're not to be documented, or our parent is not to be documented, don't continue.
        if (prop.nodoc || parentNode.nodoc) {
          prop.nodoc = true;
          return false;
        }

        // Find our own feature. If it does not exist then bail.
        const selfFeature = this.#features.query(`api:${path}`);
        if (!selfFeature) {
          prop.nodoc = true;
          return false;
        }

        // This is a valid feature, so set its feature information to the sparse partial.
        prop.canonicalFeature = selfFeature;
        prop.feature = sparseFeature(selfFeature, parentNode.canonicalFeature);
        return false;
      });

      return {namespace, byPath};
    } finally {
      this.#namespace = emptyNamespace;
    }
  }

}
