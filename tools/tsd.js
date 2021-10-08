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
  traverse.forEach(namespace.properties, toplevel, (spec, id) => {
    buf.line();
    const name = last(id);
    buf.line(`export const ${name}: ${renderType(spec, id)};`);
  });

  // Render top-level functions.
  traverse.forEach(namespace.functions, toplevel, (spec, id) => {
    buf.append(renderTopFunction(spec, id, true));
  });

  // Render events. These are just instances of `chrome.events.Event`.
  traverse.forEach(namespace.events, toplevel, (spec, id) => {
    // TODO: render events
  });

  return buf;
}


/**
 * @param {string} id
 */
function last(id) {
  const index = id.lastIndexOf('.');
  if (index !== -1) {
    return id.substr(index + 1);
  }
  return id;
}


/**
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
  let templatePart = '';

  const templates = objectTemplatesFor(id);
  if (templates) {
    templatePart = `<${templates}>`;
  }

  // if (t.templates.length) {
  //   const parts = t.templates.map((prop) => {
  //     // If we find the special nonce, don't display a template type.
  //     if (prop.type === model.requiredTemplateType) {
  //       return prop.name;
  //     }
  //     return `${prop.name} = ${renderType(prop.type, true)}`;
  //   });
  //   templatePart = `<${parts.join(', ')}>`;
  // }

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

  traverse.forEach(prop.properties, id, (spec, id) => {
    buf.line();

    const opt = spec.optional ? '?' : '';
    const name = last(id);
    buf.line(`${name}${opt}: ${renderType(spec, id)};`);
  });

  traverse.forEach(prop.functions, id, (spec, id) => {
    buf.append(renderTopFunction(spec, id, false));
  });

  traverse.forEach(prop.events, id, (spec, id) => {

  });

  buf.end('}');
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
  buf.line(`${prefix}${effectiveName}(): any;`)
  return buf;

  // TODO(samthor): Expand variations of functions, including returns_async

  fn.type.forEach((returnProperty, ...parameters) => {
    // This should never happen; the expand code on model.FunctionType should catch nodoc nodes.
    parameters = parameters.filter((p) => !filterNode(p));

    const suffix = `: ${renderType(returnProperty.type)};`;

    buf.line();
    renderComment(buf, fn, [returnProperty, ...parameters]);
    buf.line(`${prefix}${effectiveName}(`);

    if (parameters.length === 0) {
      buf.append(`)${suffix}`);
      return;
    }

    // Render each parameter on its own line.
    buf.start('');
    for (let i = 0; i < parameters.length; ++i) {
      const p = parameters[i];
      const opt = p.optional ? '?' : '';

      let effectiveParameterName = p.name;
      if (isJSKeyword(p.name)) {
        effectiveParameterName = `_${effectiveParameterName}`;
      }

      buf.line(`${effectiveParameterName}${opt}: ${renderType(p.type)},`);
    }

    buf.end(')');
    buf.append(suffix);
  });

  return buf;
}


/**
 * @param {chromeTypes.TypeSpec} spec
 * @param {string?} id
 * @param {boolean} ambig whether this is in an ambigious context (e.g., "X[]")
 * @return {string}
 */
function renderType(spec, id = null, ambig = false) {

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
    return maybeWrapAmbig(spec.choices.map((choice) => renderType(choice)).join(' | '));
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

    // If this object only has additional properties (it's just a dict), then return early.
    if (!spec.properties || !Object.keys(spec.properties).length) {
      return `{${additionalPropertiesPart}}`;
    }

    const buf = new RenderBuffer();
    buf.start('{');

    let first = true;
    if (additionalPropertiesPart) {
      first = false;
      buf.line(additionalPropertiesPart + ',');
    }

    for (const name in spec.properties) {
      const prop = spec.properties[name];
      // if (filterNode(prop)) {
      //   continue;
      // }
  
      if (first) {
        first = false;
      } else {
        buf.line();
      }
      // renderComment(buf, prop);

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

  if (spec.type === 'function') {
    return 'Function';
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

  return '?';
}
