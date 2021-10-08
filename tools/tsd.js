#!/usr/bin/env node
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


import getStdin from 'get-stdin';
import * as chromeTypes from '../types/chrome.js';
import { RenderBuffer } from './lib/buffer.js';
import { isValidToken } from './lib/js-internals.js';
import * as traverse from './lib/traverse.js';
import { last } from './lib/traverse.js';


/** @type {chromeTypes.ProcessedAPIData} */
const o = JSON.parse(await getStdin());


const buf = new RenderBuffer();
buf.start('declare namespace chrome {');

const entries = Object.entries(o.api);
entries.sort(([a], [b]) => a.localeCompare(b));
entries.forEach(([name, namespace]) => {
  const content = renderNamespace(namespace);
  if (!content) {
    return;
  }

  // TODO: why two needed?
  buf.line();
  buf.line();
  // renderComment(buf, namespace);

  if (isValidToken(name)) {
    buf.start(`export namespace ${name} {`);
    buf.append(content);
    buf.end('}');
  } else {
    // Allow keywords as namespace names by declaring and then re-exporting.
    buf.start(`namespace _${name} {`);
    buf.append(content);
    buf.end('}');
    buf.line(`export {_${name} as ${name}};`)
  }
});

buf.end('}');
buf.line();

process.stdout.write(buf.render());


/**
 * @param {chromeTypes.NamespaceSpec} namespace
 */
function renderNamespace(namespace) {
  if (namespace.nodoc) {
    return null;
  }

  const buf = new RenderBuffer();

  const toplevel = `api:${namespace.namespace}`;

  // Render top-level types. These are either interfaces or types (probably enum or choice).
  traverse.forEach(namespace.types, toplevel, (spec, id) => {
    // HACK: We get a type starting with a number at one point, but it's only used for the manifest.
    // It's invalid.
    if (id.endsWith('.3DFeature')) {
      return;
    }

    buf.line();
    const name = last(id);

    if (spec.type === 'object') {
      // This is an interface.
      buf.line('export ')
      buf.append(renderObjectAsType(spec, id));
    } else {
      // This is probably an enum, but just render it as a generic type.
      buf.line(`export type ${name} = ${renderType(spec, id)};`);
    }
  });

  // Render top-level properties. These are `const` or in one case, `let`.
  const properties = traverse.propertiesFor(namespace, toplevel);
  for (const id in properties) {
    const spec = properties[id];
    buf.line();
    const name = last(id);
    const decl = spec.optional ? 'let' : 'const';
    buf.line(`export ${decl} ${name}: ${renderType(spec, id)};`);
  }

  // Render top-level functions.
  traverse.forEach(namespace.functions, toplevel, (spec, id) => {
    buf.append(renderTopFunction(spec, id, true));
  });

  return buf;
}


/**
 * These are the template overrides for interface definitions within Chrome's extensions codebase.
 *
 * @param {string} id
 */
function objectTemplatesFor(id) {
  switch (id) {
    case 'api:events.Event':
      return 'H, C = void, A = void';

    case 'api:contentSettings.ContentSetting':
      return 'T';

    case 'api:types.ChromeSetting':
      return 'T';
  }
};


/**
 * @param {chromeTypes.TypeSpec} prop
 * @param {string} id
 */
function renderObjectAsType(prop, id) {
  const name = last(id);

  const buf = new RenderBuffer();
  buf.start('{');

  // HACK: If this has the 'instanceType' property, then this is really a class that can be be
  // constructed for declarative events. It takes "itself", in that, it can be constructed
  // with a number of properties which get cloned onto the real object.
  let mode = 'interface';
  if (prop.properties?.['instanceType']) {
    mode = 'class';
    buf.line(`constructor(arg: Omit<${name}, 'instanceType'>);`);
  }

  const properties = traverse.propertiesFor(prop, id);
  for (const childId in properties) {
    const spec = properties[childId];
    buf.line();
    const opt = spec.optional ? '?' : '';
    const name = last(childId);
    buf.line(`${name}${opt}: ${renderType(spec, childId)};`);
  }

  traverse.forEach(prop.functions, id, (spec, id) => {
    buf.append(renderTopFunction(spec, id, false));
  });

  buf.end('}');

  const templates = objectTemplatesFor(id);
  const templatePart = templates ? `<${templates}>` : '';

  return `${mode} ${name}${templatePart} ${buf.render()}`;
}


/**
 * Renders a top-level function as a top-level part of a namespace or an interface type. This looks
 * different to a property with the _type_ of a function (e.g., "foo: () => void").
 *
 * @param {chromeTypes.TypeSpec} spec
 * @param {string} id
 * @param {boolean} exportFunction true if in namespace, false if within class
 */
function renderTopFunction(spec, id, exportFunction = false) {
  if (!spec.name) {
    throw new Error(`cannot render unnamed function: ${JSON.stringify(spec)}`);
  }

  const buf = new RenderBuffer();

  let effectiveName = spec.name;
  let prefix = '';
  if (!isValidToken(spec.name) && exportFunction) {
    prefix = 'function ';
    effectiveName = `_${effectiveName}`;
    buf.line();
    buf.line(`export {${effectiveName} as ${spec.name}};`)
  } else if (exportFunction) {
    prefix = 'export function ';
  }

  const expansions = expandFunctionParams(spec);
  for (const [returnSpec, ...params] of expansions) {
    buf.line();

    const suffix = `: ${renderType(returnSpec, `${id}.return`)};`
    buf.line(`${prefix}${effectiveName}(`);

    if (params.length === 0) {
      buf.append(`)${suffix}`);
      continue;
    }

    buf.start('');
    params.forEach((param, i) => {
      const name = param.name || `_${i}`;
      const effectiveName = isValidToken(name) ? name : `_${name}`;

      const opt = param.optional ? '?' : '';
      buf.line(`${effectiveName}${opt}: ${renderType(param, `${id}.${name}`)},`);
    });
    buf.end(')');
    buf.append(`${suffix}`);
  }

  return buf;
}


/**
 * @param {chromeTypes.TypeSpec} spec
 */
function expandFunctionParams(spec) {
  const params = (spec.parameters ?? []).filter(({nodoc}) => !nodoc);

  // This includes the return value in the 0th position.
  /** @type {chromeTypes.TypeSpec[][]} */
  const expansions = [];

  if (spec.returns_async) {
    if ((spec.returns_async.parameters?.length ?? 0) > 1) {
      throw new Error(`returns_async with too many params: ${JSON.stringify(spec.returns_async)}`);
    }
    // This can be undefined, which is fine: treated as void for the Promise type.
    const singleReturnsAsyncParam = spec.returns_async.parameters?.[0];

    // Call ourselves again without `returns_async`, so we can use the `Promise` return type.
    // Replace the 0th result with a Promise.
    const { returns_async: _, ...clone } = spec;
    const promisified = expandFunctionParams(clone);

    for (const out of promisified) {
      out[0] = {
        $ref: 'Promise',
        value: [
          'return',
          singleReturnsAsyncParam,
        ],
      }
    }
    expansions.push(...promisified);

    // Push this as a callback.
    params.push(spec.returns_async);
  }

  let seenNonOptional = false;

  /** @type {number[]} */
  const optionalPositionsLeft = [];

  // Working backwards, find all optional positions found at a lower index than required ones. For
  // example, for (req, opt, req, opt), the result array will be [1] as the first required argument
  // is at 2.
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

    // This has no return type (void), so push undefined first.
    const result = /** @type {chromeTypes.TypeSpec[]} */ (work.filter((x) => x !== null));
    expansions.push([{ type: 'void' }, ...result]);
  }

  return expansions;
}


/**
 * @param {chromeTypes.TypeSpec|undefined} spec
 * @param {string?} id
 * @param {boolean} ambig whether this is in an ambigious context (e.g., "X[]")
 * @return {string}
 */
function renderType(spec, id, ambig = false) {
  if (spec === undefined || spec.type === 'void') {
    return 'void';
  }

  // This should probably never happen. We could instead return `void`.
  if (spec.nodoc) {
    throw new Error(`render nodoc type: ${JSON.stringify(spec)}`);
  }

  /** @type {(s: string) => string} */
  const maybeWrapAmbig = ambig ? (s) => `(${s})` : (s) => s;

  if (spec.enum) {
    if (!['string', 'integer'].includes(spec.type ?? '') || spec.enum.length === 0) {
      throw new Error(`invalid enum: ${spec.type} / ${JSON.stringify(spec.enum)}`);
    }

    /** @type {string[]|number[]} */
    let primitiveOnly;
    if (typeof spec.enum[0] === 'object') {
      // TODO(samthor): We could create virtual fake types for this.
      const pairs = /** @type {{name: string}[]} */ (spec.enum);
      primitiveOnly = pairs.map(({name}) => name);
    } else {
      primitiveOnly = /** @type {string[]|number[]} */ (spec.enum);
    }

    return maybeWrapAmbig(primitiveOnly.map((x) => JSON.stringify(x)).join(' | '));
  }

  if (spec.choices) {
    if (spec.choices.length === 0) {
      throw new Error(`zero choices`);
    }
    return maybeWrapAmbig(spec.choices.map((choice) => renderType(choice, null)).join(' | '));
  }

  if (spec.type === 'array') {
    // HACK: Some array types are missing items, just assume it's a number.
    const { items = { type: 'number' } } = spec;

    // There's a maximum number of items here. Render tuples from min -> max.
    if (spec.maxItems) {
      /** @type {string[]} */
      const parts = [];

      const inner = renderType(items, id, true);
      for (let i = spec.minItems ?? 0; i <= spec.maxItems; ++i) {
        parts.push(`[${new Array(i).fill(inner).join(', ')}]`);
      }
      return parts.length === 1 ? parts[0] : maybeWrapAmbig(parts.join(' | '));
    }

    const t = renderType(items, id, true);
    const arr = `${t}[]`;

    // This has a minimum item count, but not a maximum.
    if (spec.minItems) {
      const r = new Array(spec.minItems).fill(t);
      return maybeWrapAmbig(`[${r.join(',')}, ...${arr}]`);
    }

    // This is an actually boring array.
    return arr;
  }

  if (spec.type === 'object') {
    const additionalPropertiesPart = spec.additionalProperties ? 
      `[name: string]: ${renderType(spec.additionalProperties, id)}` :
      '';

    /** @type {{[id: string]: chromeTypes.TypeSpec}} */
    let props = {};

    if (id !== null) {
      props = traverse.propertiesFor(spec, id);
    } else {
      // TODO: ignored for now
      // throw new Error(`got inner object without id: ${JSON.stringify(spec)}`);
    }

    // If this object only has additional properties (it's just a dict), then return early.
    if (!Object.keys(props).length) {
      return `{${additionalPropertiesPart}}`;
    }

    const buf = new RenderBuffer();
    buf.start('{');

    let first = true;
    if (additionalPropertiesPart) {
      first = false;
      buf.line(additionalPropertiesPart + ',');
    }

    for (const childId in props) {
      const prop = props[childId];
      // if (filterNode(prop)) {
      //   continue;
      // }
  
      if (first) {
        first = false;
      } else {
        buf.line();
      }
      // renderComment(buf, prop);

      const name = last(childId);
      const opt = prop.optional ? '?' : '';
      buf.line(`${name}${opt}: ${renderType(prop, `${id}.${name}`)},`);
    }

    buf.end('}');
    return buf.render();
  }

  if (spec.$ref) {
    if (spec.value) {
      if (!Array.isArray(spec.value)) {
        throw new Error(`unexpected template type for $ref: ${JSON.stringify(spec.value)}`);
      }
      if (spec.value.length === 2) {
        const templateType = spec.value[1];
        const inner = renderType(templateType, id);
        return `${spec.$ref}<${inner}>`;
      }
      // TODO: this appears on StorageArea and friends
    }

    return spec.$ref;
  }

  if (spec.value) {
    return JSON.stringify(spec.value);
  }

  // Render inline functions. Catch where no type is specified but we have parameters.
  if (spec.type === 'function' || (!spec.type && spec.parameters)) {
    const buf = new RenderBuffer();

    // Filter nodoc parameters, which appear occasionally. They are effectively optional params
    // so just remove them here.
    const params = (spec.parameters ?? []).filter(({nodoc}) => !nodoc);
    if (params.length) {
      buf.start('(');
      let needsGap = false;

      // HACK: Sometimes we find early optional parameters in inline functions. This isn't valid,
      // so just disallow it anyway, and only allow tail optionals.
      let lastOptional = params.length;
      while (params[lastOptional - 1]?.optional) {
        --lastOptional;
      }

      params.forEach((param, i) => {
        if (needsGap) {
          buf.line();
        }

        // if (renderComment(buf, p)) {
        //   needsGap = true;
        // }

        const opt = i >= lastOptional && param.optional ? '?' : '';
        buf.line(`${param.name}${opt}: ${renderType(param, `${id}.${param.name}`)},`);
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
    buf.append(` => ${renderType(spec.returns, `${id}.return`)}`);
    return buf.render();
  }

  switch (spec.type) {
    case 'int64':
    case 'integer':
    case 'number':
    case 'double':
      return 'number';

    case 'binary':
      return 'ArrayBuffer';

    case 'boolean':
    case 'string':
    case 'any':
      return spec.type;
  }

  throw new Error(`unsupported type: ${JSON.stringify(spec)}`);
}
