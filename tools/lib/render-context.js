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
import * as overrideTypes from '../../types/override.js';
import { RenderBuffer } from './buffer.js';
import { isValidToken } from './js-internals.js';
import { last, TraverseContext } from './traverse.js';


export class RenderContext {
  #override;
  #t;

  /** @type {chromeTypes.SpecCallback[]} */
  #callbacks = [];

  #skipCallbackCount = 0;

  /**
   * @template T
   * @param {() => T} fn
   * @return {T}
   */
  #skipCallbacks = (fn) => {
    try {
      ++this.#skipCallbackCount;
      return fn();
    } finally {
      --this.#skipCallbackCount;
    }
  };

  /**
   * @param {overrideTypes.RenderOverride} override
   */
  constructor(override) {
    this.#override = override;

    const isVisible = override.isVisible.bind(override);
    this.#t = new TraverseContext(isVisible);
  }

  /**
   * @param {chromeTypes.SpecCallback} callback
   */
  addCallback(callback) {
    this.#callbacks.push(callback);
  }

  /**
   * Renders every passed namespace as .d.ts.
   *
   * @param {chromeTypes.NamespaceSpec[]} apis
   * @return {string}
   */
  renderAll(apis) {
    const buf = new RenderBuffer();
    buf.start('declare namespace chrome {');

    apis = apis.slice();
    apis.sort(({ namespace: a }, { namespace: b }) => a.localeCompare(b));

    apis.forEach((namespace) => {
      buf.append(this.maybeRenderNamespace(namespace));
    });

    buf.end('}');
    buf.line();

    return buf.render(true);
  }

  /**
   * Optionally render a namespace. Renders nothing if it has no content.
   *
   * @param {chromeTypes.NamespaceSpec} namespace
   * @return {string}
   */
  maybeRenderNamespace(namespace) {
    const toplevel = `api:${namespace.namespace}`;
    if (!this.#override.isVisible(namespace, toplevel)) {
      return '';
    }

    const content = this.renderInnerNamespace(namespace, toplevel);
    if (content.isEmpty) {
      return '';
    }

    const buf = new RenderBuffer();

    buf.line();
    buf.append(this.renderComment(namespace, toplevel));
    buf.line();

    const { namespace: name } = namespace;
    if (isValidToken(name)) {
      buf.start(`export namespace ${name} {`);
      buf.append(content);
      buf.end('}');
    } else {
      // Allow keywords as namespace names by declaring and then re-exporting.
      // This only matters for `api:debugger`.
      buf.start(`namespace _${name} {`);
      buf.append(content);
      buf.end('}');
      buf.line(`export {_${name} as ${name}};`)
    }

    return buf.render(true);
  }

  /**
   * Renders all properties, events, functions etc for this namespace. Returns an empty buffer
   * if we have no symbols.
   *
   * @param {chromeTypes.NamespaceSpec} namespace
   * @param {string} toplevel
   * @return {string}
   */
  renderInnerNamespace(namespace, toplevel) {
    const buf = new RenderBuffer();

    // TODO: We do an awkward cast here, because typeOverride only accepts TypeSpec.
    namespace = /** @type {chromeTypes.NamespaceSpec} */ (
        this.#override.typeOverride(namespace, toplevel)) ?? namespace;

    // Render top-level types. These are either interfaces or types (probably enum or choice).
    this.#t.forEach(namespace.types, toplevel, (spec, id) => {
      const name = last(id);

      // HACK: We get a type starting with a number at one point, but it's only used for the
      // manifest. It's invalid, and we can't re-export this anyway.
      if (!isValidToken(name)) {
        return;
      }

      buf.line();
      buf.append(this.renderComment(spec, id));

      if (spec.type === 'object' && !spec.isInstanceOf) {
        // This is an interface.
        buf.line('export ')
        buf.append(this.renderObjectAsType(spec, id));
      } else {
        // This is probably an enum, but just render it as a generic type.
        buf.line(`export type ${name} = ${this.renderType(spec, id)};`);
      }
    });

    // Render top-level properties. These are `const` or in one case, `let`.
    const properties = this.#t.propertiesFor(namespace, toplevel);
    for (const id in properties) {
      const spec = properties[id];
      buf.line();
      const name = last(id);
      const decl = spec.optional ? 'let' : 'const';

      buf.append(this.renderComment(spec, id));
      buf.line(`export ${decl} ${name}: ${this.renderType(spec, id)};`);
    }

    // Render top-level functions.
    this.#t.forEach(namespace.functions, toplevel, (spec, id) => {
      buf.append(this.renderTopFunction(spec, id, true));
    });

    return buf.render(true);
  }


  /**
   * @param {chromeTypes.TypeSpec} prop
   * @param {string} id
   * @return {string}
   */
  renderObjectAsType(prop, id) {
    this.#announce(prop, id);

    prop = this.#override.typeOverride(prop, id) ?? prop;

    const name = last(id);

    const buf = new RenderBuffer();
    buf.start('{');

    // HACK: If this has the 'instanceType' property, then this is really a class that can be be
    // constructed for declarative events. It takes "itself", in that, it can be constructed
    // with a number of properties which get cloned onto the real object.
    let mode = 'interface';
    const instanceTypeProp = prop.properties?.['instanceType'];
    if (instanceTypeProp) {
      mode = 'class';
      if (instanceTypeProp.nodoc) {
        buf.line(`constructor(arg: ${name});`);
      } else {
        // `instanceType` is visible, but we don't need it to construct this object, so Omit it.
        buf.line(`constructor(arg: Omit<${name}, 'instanceType'>);`);
      }
    }

    const properties = this.#t.propertiesFor(prop, id);
    for (const childId in properties) {
      const spec = properties[childId];

      // Some functions show up as properties, but they're really functions.
      // There's no way to make these optional, so only include non-optional.
      if (!spec.optional && spec.type === 'function') {
        buf.append(this.renderTopFunction(spec, childId));
        continue;
      }

      buf.line();

      const commentBuffer = this.renderComment(spec, childId);
      if (!commentBuffer?.isEmpty) {
        buf.append(commentBuffer);
      }

      const opt = spec.optional ? '?' : '';
      const name = last(childId);
      buf.line(`${name}${opt}: ${this.renderType(spec, childId)};`);
    }

    this.#t.forEach(prop.functions, id, (spec, id) => {
      buf.append(this.renderTopFunction(spec, id, false));
    });

    buf.end('}');

    const templates = this.#override.objectTemplatesFor(id);
    const templatePart = templates ? `<${templates}>` : '';

    return `${mode} ${name}${templatePart} ${buf.render(true)}`;
  }

  /**
   * Renders a top-level function as a top-level part of a namespace or an interface type. This
   * looks different to a property with the _type_ of a function (e.g., "foo: () => void").
   *
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   * @param {boolean} isNamespaceFunction true if in namespace, false if within class
   * @return {string}
   */
  renderTopFunction(spec, id, isNamespaceFunction = false) {
    spec = this.#override.typeOverride(spec, id) ?? spec;
    if (spec.$ref) {
      throw new Error(`got function which has '$ref' to other: ${JSON.stringify(spec)}`);
    }

    const name = last(id);

    const buf = new RenderBuffer();

    let effectiveName = name;
    let prefix = '';

    if (isNamespaceFunction) {
      if (isValidToken(name)) {
        prefix = 'export function ';
      } else {
        // HACK: This happens once for a method named `delete`.
        prefix = 'function ';
        effectiveName = `_${effectiveName}`;
        buf.line();
        buf.line(`export {${effectiveName} as ${name}};`)
      }
    }

    /** @type {Map<string, chromeTypes.NamedTypeSpec>} */
    const allParams = new Map();

    // Don't invoke symbol callbacks while we render this, because there's many possible expansions.
    this.#skipCallbacks(() => {
      const expansions = this.#t.expandFunctionParams(spec, id);

      // Record all possible expansions, except void, which isn't rendered / does not exist.
      expansions.flat().forEach((param) => {
        if (spec.type !== 'void') {
          allParams.set(param.name, param);
        }
      });

      for (const [returnSpec, ...params] of expansions) {
        buf.line();
  
        // Limit the comments here to the parameters of this specific expansion.
        /** @type {chromeTypes.TypeSpec} */
        const virtualSpec = {
          ...spec,
          parameters: params,
          returns: returnSpec,
        };
        buf.append(this.renderComment(virtualSpec, id));

        if (returnSpec.name !== 'return') {
          throw new Error(`expected return type to have name "return": ${JSON.stringify(returnSpec)}`);
        }
        const suffix = `: ${this.renderReturnType(returnSpec, `${id}.${returnSpec.name}`)};`
        buf.line(`${prefix}${effectiveName}(`);
  
        if (params.length === 0) {
          buf.append(`)${suffix}`);
          continue;
        }
  
        buf.start('');
        this.#t.forEach(params, id, (param, childId) => {
          buf.line();

          // The @param _description_ has already been annotated by our parent, but include all the
          // other possible tags for this node here.
          const comment = this.renderCommentWithoutDescription(param, childId);
          if (!comment?.isEmpty) {
            buf.append(comment);
          }

          const name = last(childId);
          const effectiveName = isValidToken(name) ? name : `_${name}`;
          const opt = param.optional ? '?' : '';
          buf.line(`${effectiveName}${opt}: ${this.renderType(param, childId)},`);
        });
  
        buf.end(')');
        buf.append(`${suffix}`);
      }
    });

    // Announce the function itself, and the union of all parmeters. Announcing is a side-effect of
    // rendering.
    this.#announce(spec, id);
    for (const param of allParams.values()) {
      const childId = `${id}.${param.name}`;
      this.renderType(param, childId);
    }

    return buf.render(true);
  }

  /**
   * As per {@link renderType}, but allows for the optional property via allowing `undefined`.
   *
   * Doesn't announce this symbol.
   *
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   * @return {string}
   */
  renderReturnType(spec, id) {
    if (!spec.optional) {
      return this.renderType(spec, id);
    }
    return `${this.renderType(spec, id, true)} | undefined`;
  }

  /**
   * Renders an type inline. This usually returns a single line, but can also return multiple (e.g.,
   * if the type represents an object with many properties).
   *
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   * @param {boolean} ambig whether this is in an ambigious context (e.g., "X[]")
   * @return {string}
   */
  renderType(spec, id, ambig = false) {
    spec = this.#override.typeOverride(spec, id) ?? spec;

    this.#announce(spec, id);

    // This is like $ref, but seems to win.
    if (spec.isInstanceOf) {
      return spec.isInstanceOf;
    }

    /** @type {(s: string) => string} */
    const maybeWrapAmbig = ambig ? (s) => `(${s})` : (s) => s;

    if (spec.enum) {
      if (!['string', 'integer'].includes(spec.type ?? '') || spec.enum.length === 0) {
        throw new Error(`invalid enum: ${JSON.stringify(spec)}`);
      }

      /** @type {(string | number)[]} */
      const primitiveOnly = spec.enum.map((raw) => {
        if (typeof raw === 'object') {
          return raw.name;
        }
        return raw;
      });
      return maybeWrapAmbig(primitiveOnly.map((x) => JSON.stringify(x)).join(' | '));
    }

    if (spec.choices) {
      if (spec.choices.length === 0) {
        throw new Error(`invalid choices, no options: ${JSON.stringify(spec)}`);
      }

      // This confirms that the choices don't, e.g., have two object types that might possibly
      // have colliding properties.
      // This only matters if we're doing history types.
      // What's the fix if this fires? Probably to add a `childId` when we render the specific
      // choices.
      let seenWithDerivatives = false;
      spec.choices.forEach((c) => {
        if (c.properties || c.parameters || c.returns || c.returns_async) {
          if (seenWithDerivatives) {
            throw new Error(`found choices with ambiguous options: ${JSON.stringify(spec.choices)}`);
          }
          seenWithDerivatives = true;
        }
      });

      return maybeWrapAmbig(spec.choices.map((choice) => this.renderType(choice, id)).join(' | '));
    }

    if (spec.type === 'array') {
      // HACK: Some array types are missing items, just assume it's a number.
      const { items = { type: 'number' } } = spec;

      // Announce the enclosed type and render it (with the same ID).
      const inner = this.renderType(items, id, true);

      // There's a maximum number of items here. Render tuples from min -> max.
      if (spec.maxItems) {
        /** @type {string[]} */
        const parts = [];

        for (let i = spec.minItems ?? 0; i <= spec.maxItems; ++i) {
          parts.push(`[${new Array(i).fill(inner).join(', ')}]`);
        }
        return parts.length === 1 ? parts[0] : maybeWrapAmbig(parts.join(' | '));
      }

      // This has a minimum item count, but not a maximum.
      if (spec.minItems) {
        const r = new Array(spec.minItems).fill(inner);
        return maybeWrapAmbig(`[${r.join(',')}, ...${inner}[]]`);
      }

      // This is an actually boring array.
      return `${inner}[]`;
    }

    if (spec.type === 'object') {
      const additionalPropertiesPart = spec.additionalProperties ?
        `[name: string]: ${this.renderType(spec.additionalProperties, id)}` :
        '';

      const props = this.#t.propertiesFor(spec, id);

      // If this object only has additional properties (it's just a dict), then return early.
      if (!Object.keys(props).length) {
        return `{${additionalPropertiesPart}}`;
      }

      const buf = new RenderBuffer();
      buf.start('{');

      if (additionalPropertiesPart) {
        buf.line(additionalPropertiesPart + ',');
      }

      for (const childId in props) {
        const prop = props[childId];

        buf.line();

        const commentBuffer = this.renderComment(prop, childId);
        if (!commentBuffer?.isEmpty) {
          buf.append(commentBuffer);
        }

        const name = last(childId);
        const opt = prop.optional ? '?' : '';
        buf.line(`${name}${opt}: ${this.renderType(prop, childId)},`);
      }

      buf.end('}');
      return buf.render();
    }

    if (spec.$ref) {
      // HACK: This is a special-case: `api:storage.sync` and friends have properties that are
      // combined with a $ref instance. We treat this as a union (the only case in the codebase).
      if (spec.properties && Object.keys(spec.properties).length) {
        const { properties, ...rest } = spec;

        // Render the $ref without announcing it, so we don't get duplicate symbols.
        const renderedRefType = this.#skipCallbacks(() => this.renderType(rest, id));
        const s = [
          renderedRefType,
          this.renderType({ properties, type: 'object' }, id),
        ];
        return s.join(' & ')
      }

      // This (probably) has a template type.
      if (spec.value) {
        if (!Array.isArray(spec.value)) {
          throw new Error(`unexpected template type for $ref: ${JSON.stringify(spec.value)}`);
        }

        // HACK: We see ['randomString', { type } ] in the codebase, but occasionally give extra
        // types in our rendering to demonstrate further template types.
        if (spec.value.length > 1) {
          const templates = /** @type {chromeTypes.TypeSpec[]} */ (spec.value.slice(1));
          const inner = templates.map((spec) => {
            // nb. This renders with the same parent ID.
            // FIXME: XXX This should WIN over the parent, e.g., Promise<void>
                  // suddenly type is added! Promise<Foo> should be "new".
                  // ugh doesn't really work? same ID?
            return this.renderType(spec, id);
          });
          return `${spec.$ref}<${inner.join(', ')}>`;
        }

        // nb. The single variable name appears on instances of `api:storage.StorageArea`, but
        // doesn't seem to mean anything. Ignore for now.
      }

      return spec.$ref;
    }

    if (spec.value) {
      return JSON.stringify(spec.value);
    }

    // Render inline functions. Catch where no type is specified but we have parameters.
    if (spec.type === 'function' || (!spec.type && spec.parameters)) {
      const buf = new RenderBuffer();

      if (spec.$ref) {
        throw new Error(`got function which has '$ref' to other: ${JSON.stringify(spec)}`);
      }

      // Extract a list of args and their childIds, using the traverse helper, which will filter
      // properties that are nodoc or similar.
      /** @type {{ param: chromeTypes.TypeSpec, id: string }[]} */
      const args = [];
      this.#t.forEach(spec.parameters, id, (param, childId) => {
        args.push({ param, id: childId });
      });

      if (args.length) {
        buf.start('(');

        // HACK: Sometimes we find early optional parameters in inline functions. This isn't valid,
        // so just disallow it anyway, and only allow tail optionals.
        let lastOptional = args.length;
        while (args[lastOptional - 1]?.param.optional) {
          --lastOptional;
        }

        args.forEach(({ param, id: childId }, i) => {

          // The @param _description_ has already been annotated by our parent, but include all the
          // other possible tags for this node here.
          const comment = this.renderCommentWithoutDescription(param, childId);
          if (!comment?.isEmpty) {
            buf.append(comment);
          }

          const opt = i >= lastOptional && param.optional ? '?' : '';
          buf.line(`${param.name}${opt}: ${this.renderType(param, childId)},`);
        });

        buf.end(')');
      } else {
        buf.append('()');
      }

      // Inline functions cannot have dual Promise/return behavior.
      if (spec.returns_async) {
        throw new Error(`got inline returns_async on function: ${JSON.stringify(spec)}`);
      }

      // We give this an internal ID of "return", which is a keyword, to match feature definitions
      // and availability version-over-version.
      const returns = spec.returns ?? { type: 'void' };
      buf.append(` => ${this.renderReturnType(returns, `${id}.return`)}`);

      return buf.render();
    }

    switch (spec.type) {
      case 'int64':
      case 'integer':
      case 'number':
      case 'double':
        // Unfortunately TypeScript doesn't let us specify floating point vs integer, nor
        // minimum/maximum values for numbers (which are in the definitions).
        return 'number';

      case 'binary':
        return 'ArrayBuffer';

      case 'any':
      case 'boolean':
      case 'string':
      case 'void':
      case 'never':
      case 'undefined':
        return spec.type;
    }

    throw new Error(`unsupported type: ${JSON.stringify(spec)}`);
  }

  /**
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   * @return {RenderBuffer?}
   */
  renderCommentWithoutDescription(spec, id) {
    const {description, ...rest} = spec;
    return this.renderComment(rest, id);
  }

  /**
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   * @return {chromeTypes.Tag[]}
   */
  tagsForRenderComment(spec, id) {
    /** @type {chromeTypes.Tag[]} */
    const tags = [];

    // Include @param only if we actually have something to say about it.
    this.#t.forEach(spec.parameters, id, (param, childId) => {
      const description = sanitizeCommentData(param.description?.trim());
      if (description) {
        tags.push({ name: 'param', value: `${last(childId)} ${description}` });
      }
    });

    if (spec.returns && spec.returns?.type !== 'void') {
      if (spec.returns?.description) {
        const value = sanitizeCommentData(spec.returns.description);
        tags.push({ name: 'returns', value });
      }

      // If there's extra tags really intended for the return type, then include them all under a
      // special "extra" tag. This is expanded by our TypeDoc parser on developer.chrome.com.
      const tagsForReturn = this.tagsForRenderComment(spec.returns, `${id}.return`);
      const transformedTags = tagsForReturn.map((tag) => {
        return {
          name: 'chrome-returns-extra',
          value: tag.name + (tag.value ? ` ${tag.value}` : ''),
        };
      });
      tags.unshift(...transformedTags);
    }

    if (spec.deprecated) {
      const value = sanitizeCommentData(spec.deprecated ?? '');
      tags.push({ name: 'deprecated', value });
    }

    // HACK: This adds `@chrome-enum "NAME" description` to the comment.
    // We don't have a great way to document these otherwise.
    if (spec.enum) {
      for (const e of spec.enum) {
        if (typeof e === 'object' && e.description) {
          const value = `${JSON.stringify(e.name)} ${sanitizeCommentData(e.description)}`;
          tags.push({ name: 'chrome-enum', value });
        }
      }
    }

    // Rewrite any tags with values.
    for (const tag of tags) {
      if (tag.value) {
        // TODO: This can generate multi-line tags.
        tag.value = this.#override.rewriteComment(tag.value, id, tag.name) ?? tag.value;
      }
    }

    // Append any additional tags. These don't get rewritten.
    tags.push(...this.#override.tagsFor(spec, id) ?? []);

    return tags;
  }

  /**
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   * @return {RenderBuffer?}
   */
  renderComment(spec, id) {
    const tags = this.tagsForRenderComment(spec, id);

    let description = sanitizeCommentData(spec.description);

    // Rewrite the description.
    if (description) {
      description = this.#override.rewriteComment(description, id) ?? description;
    }

    if (description || tags.length) {
      const buf = new RenderBuffer();
      buf.comment(description, tags);
      return buf;
    }

    return null;
  }

  /**
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   */
  #announce = (spec, id) => {
    if (this.#skipCallbackCount || spec.type === 'void') {
      return;
    }
    for (const callback of this.#callbacks) {
      callback(spec, id);
    }
  };
}


/**
 * Removes instances of "NONE" or "TODO" from the comment data.
 *
 * @param {string|undefined} raw
 */
function sanitizeCommentData(raw) {
  if (raw) {
    const checkLower = raw.toLocaleLowerCase();
    if (checkLower === 'none' || checkLower === 'todo') {
      return undefined;
    }
  }
  return raw;
}
