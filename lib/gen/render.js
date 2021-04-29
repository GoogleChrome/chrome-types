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


import * as model from './model.js';
import * as types from '../../types/index.js';
import {RenderBuffer} from '../buffer.js';
import {tagsForParameters} from './helper.js';


const undefinedType = new model.PrimitiveType('undefined');


/**
 * @param {model.Node} node
 * @return {boolean} whether to remove this node from render
 */
function filterNode(node) {
  if (node.nodoc) {
    return true;
  }

  const f = node.feature;
  if (f.platformAppsOnly) {
    return true;
  }

  if (f.maxManifestVersion !== undefined && f.maxManifestVersion < 3) {
    return true;
  }

  return false;
}


/**
 * Renders top-level namespaces.
 *
 * This automatically filters to nodes that are publicly documented (i.e., not nodoc), supported
 * for regular extensions (i.e., not platform apps only), and which are supported in Manifest V3+.
 *
 * @param {model.Namespace[]} namespaces
 */
export function renderNamespaces(namespaces) {
  const buf = new RenderBuffer();
  buf.start('declare namespace chrome {');

  namespaces = namespaces.slice();
  namespaces.sort(({name: a}, {name: b}) => a.localeCompare(b));

  for (const namespace of namespaces) {
    if (filterNode(namespace)) {
      continue;
    }

    buf.line();

    // Allow keywords as namespace names by declaring and then re-exporting.
    if (isJSKeyword(namespace.name)) {
      buf.line(`export {_${namespace.name} as ${namespace.name}};`)
      buf.line();
      renderComment(buf, namespace);
      buf.line(`namespace _${namespace.name} {`);
    } else {
      renderComment(buf, namespace);
      buf.line(`export namespace ${namespace.name} {`);
    }

    buf.start();

    for (const name in namespace.all) {
      const prop = namespace.all[name];
      if (filterNode(prop)) {
        continue;
      }

      if (prop.type instanceof model.FunctionType) {
        renderTopFunction(buf, prop, namespace, true)
        continue;
      }

      // Allow keywords as parts of this namespace by delcaring and then re-exporting.
      const invalid = isJSKeyword(name);
      const effectiveName = invalid ? `_${name}` : name;
      if (invalid) {
        buf.line();
        buf.line(`export {${effectiveName} as ${name}};`);
      }
      buf.line();
      renderComment(buf, prop);

      buf.append(invalid ? '\n' : '\nexport ');

      if (prop.isType && prop.type instanceof model.ObjectType) {
        buf.append(renderObjectAsType(prop, effectiveName));
      } else if (prop.isType) {
        buf.append(`type ${effectiveName} = ${renderType(prop.type)};`);
      } else if (prop.optional) {
        // This only occurs for `runtime.lastError`.
        const optionalType = new model.ChoicesType([prop.type, undefinedType]);
        buf.append(`let ${effectiveName}: ${renderType(optionalType)};`);
      } else {
        buf.append(`const ${effectiveName}: ${renderType(prop.type)};`);
      }
    }

    buf.end('}');
  }

  buf.end('}');
  return buf.render();
}


/**
 * Helper to render a fixed tuple. Used for specific array counts.
 *
 * @param {number} count
 * @param {string} inner
 * @return {string}
 */
function renderTuple(count, inner) {
  const out = [];

  for (let i = 0; i < count; ++i) {
    out.push(inner);
  }

  return `[${out.join(', ')}]`;
}


/**
 * @param {model.Property} prop
 * @param {string} effectiveName
 */
function renderObjectAsType(prop, effectiveName) {
  if (!(prop.type instanceof model.ObjectType) || !prop.isType) {
    throw new Error('invalid arg');
  }
  const t = prop.type;

  let templatePart = '';
  if (t.templates.length) {
    const parts = t.templates.map((prop) => {
      // If we find the special nonce, don't display a template type.
      if (prop.type === model.requiredTemplateType) {
        return prop.name;
      }
      return `${prop.name} = ${renderType(prop.type, true)}`;
    });
    templatePart = `<${parts.join(', ')}>`;
  }

  const buf = new RenderBuffer();
  buf.start('{');

  // HACK: If this has the 'instanceType' property, then this is really a class that can be be
  // constructed for declarative events. It takes "itself", in that, it can be constructed
  // with a number of properties which get cloned onto the real object.
  let mode = 'interface';
  if (t.special === 'instanceType') {
    mode = 'class';
    buf.line(`constructor(arg: Omit<${effectiveName}, 'instanceType'>);`);
  }

  for (const name in t.properties) {
    const child = t.properties[name];
    if (filterNode(child)) {
      continue;
    }

    if (child.type instanceof model.FunctionType) {
      renderTopFunction(buf, child, prop);
    } else {
      buf.line();
      renderComment(buf, child);

      const opt = child.optional ? '?' : '';
      buf.line(`${name}${opt}: ${renderType(child.type)};`);
    }
  }

  buf.end('}');
  return `${mode} ${effectiveName}${templatePart} ${buf.render()}`;
}


/**
 * @param {model.Type} type to render
 * @param {boolean} ambig whether this is in an ambigious context (e.g., "X[]")
 * @return {string}
 */
export function renderType(type, ambig = false) {
  /**
   * @type {(s: string) => string}
   */
  const maybeWrap = ambig ? (s) => `(${s})` : (s) => s;

  if (type instanceof model.PrimitiveType) {
    return type.primitiveType;
  } else if (type instanceof model.LiteralType) {
    return JSON.stringify(type.value);
  } else if (type instanceof model.RefType) {
    let out = type.name;
    if (type.templates.length) {
      out += `<${type.templates.map((t) => renderType(t)).join(', ')}>`
    }
    return out;
  } else if (type instanceof model.SequenceType) {
    const {itemType} = type;

    if (type.maxItems === undefined) {
      const t = renderType(itemType, true);
      const arr = `${t}[]`;

      if (type.minItems === 0) {
        return arr;
      }

      /** @type {string[]} */
      const r = [];
      for (let i = 0; i < type.minItems; ++i) {
        r.push(t);
      }
      return maybeWrap(`[${r.join(',')}, ...${arr}]`);
    }

    const parts = [];

    const low = type.minItems ?? 0;
    const high = type.maxItems;

    const inner = renderType(itemType, true);
    for (let i = low; i <= high; ++i) {
      parts.push(renderTuple(i, inner));
    }

    if (parts.length === 1) {
      return parts[0];
    }
    return maybeWrap(parts.join(' | '));
  } else if (type instanceof model.ObjectType) {
    const buf = new RenderBuffer();
    const additionalPropertiesPart = type.additionalProperties ? 
      `[name: string]: ${renderType(type.additionalProperties)}` :
      '';

    if (Object.keys(type.properties).length === 0) {
      return `{${additionalPropertiesPart}}`;
    }

    buf.start('{');

    let first = true;

    if (additionalPropertiesPart) {
      first = false;
      buf.line(additionalPropertiesPart + ',');
    }

    for (const name in type.properties) {
      const prop = type.properties[name];
      if (filterNode(prop)) {
        continue;
      }
  
      if (first) {
        first = false;
      } else {
        buf.line();
      }
      renderComment(buf, prop);

      const opt = prop.optional ? '?' : '';
      buf.line(`${name}${opt}: ${renderType(prop.type)},`);
    }

    buf.end('}');
    return buf.render();
  } else if (type instanceof model.UnionType) {
    const inner = type.types.map((t) => renderType(t, true)).join(' & ');
    return maybeWrap(inner);
  } else if (type instanceof model.ChoicesType) {
    const inner = type.choices.map((t) => renderType(t, true)).join(' | ');
    return maybeWrap(inner);
  } else if (type instanceof model.FunctionType) {
    const parameters = type.singleExpansion();
    const buf = new RenderBuffer();

    if (parameters.length === 1) {
      buf.append('()');
    } else {
      buf.start('(');

      let needsGap = false;
      parameters.forEach((p, index) => {
        if (index === 0) {
          return;
        }

        if (needsGap) {
          buf.line();
        }

        if (renderComment(buf, p)) {
          needsGap = true;
        }

        const opt = p.optional ? '?' : '';
        buf.line(`${p.name}${opt}: ${renderType(p.type)},`);
      });

      buf.end(')');
    }

    buf.append(` => ${renderType(parameters[0].type, true)}`);
    return buf.render();
  }

  console.warn('unrenderable', type);
  throw new Error(`unrenderable type: ${type}`);
}


/**
 * @param {RenderBuffer} buf
 * @param {model.Node} node
 * @param {model.Property[]?} overrideParameters
 * @return {boolean}
 */
function renderComment(buf, node, overrideParameters = null) {
  /** @type {types.Tag[]} */
  const tags = [];

  const f = node.feature;

  if (f.chromeOsOnly) {
    tags.push({name: 'chrome-platform', value: 'chromeos'});
  }
  f.permissions?.forEach((value) => tags.push({name: 'chrome-permission', value}));

  if (f.availableFromVersion) {
    tags.push({name: 'since', value: `Chrome ${f.availableFromVersion}`});
  }

  if (f.supportedInChannel === undefined || f.supportedInChannel === 'stable') {
    // ignore, this is implicit
  } else if (f.supportedInChannel === 'beta') {
    tags.push({name: 'chrome-channel', value: 'beta'});
    tags.push({name: 'beta'});
  } else {
    // This includes 'dev', 'canary' and 'trunk'.
    tags.push({name: 'chrome-channel', value: f.supportedInChannel});
    tags.push({name: 'alpha'});
  }

  if (f.unknownVersion) {
    // This indicates that we're a brand new API not yet known about in version history.
    tags.push({name: 'chrome-unknown-version'});
  }

  if (f.disallowForServiceWorkers) {
    tags.push({name: 'chrome-disallow-service-workers'});
  }

  if (node.deprecated !== undefined) {
    const value = node.deprecated ?? '';
    tags.push({name: 'deprecated', value});
  }

  if (f.deprecatedSinceVersion) {
    tags.push({name: 'deprecated-since', value: `Chrome ${f.deprecatedSinceVersion}`});
  }

  if (node instanceof model.Property) {
    const {type} = node;

    if (type instanceof model.FunctionType) {
      const parameters = (overrideParameters ?? type.singleExpansion()).slice();
      const returns = /** @type {model.Property} */ (parameters.shift());

      tags.push(...tagsForParameters(returns, parameters));
    }
  }

  if (node.description || tags.length) {
    buf.comment(node.description, tags);
    return true;
  }

  return false;
}


/**
 * Renders a top-level function as a top-level part of a namespace or an interface type. This looks
 * different to a property with the _type_ of a function (e.g., "foo: () => void").
 *
 * @param {RenderBuffer} buf
 * @param {model.Property} fn
 * @param {model.Node} parent the node of namespace or interface type
 * @param {boolean} exportFunction true if in namespace, false if within class
 */
function renderTopFunction(buf, fn, parent, exportFunction = false) {
  if (!(fn.type instanceof model.FunctionType)) {
    throw new Error('expected FunctionType');
  }

  let effectiveName = fn.name;

  let prefix = '';
  if (isJSKeyword(fn.name) && exportFunction) {
    prefix = 'function ';
    effectiveName = `_${effectiveName}`;
    buf.line();
    buf.line(`export {${effectiveName} as ${fn.name}};`)
  } else if (exportFunction) {
    prefix = 'export function ';
  }

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
}


/**
 * @param {string} arg 
 * @return {boolean}
 */
function isJSKeyword(arg) {
  const keywords = [
    'debugger',
    'delete',
    'import',
    'export',
    'void',
    'function',
    'switch',
    // There's more, but we only hit a few for now.
  ];
  return keywords.includes(arg);
}

