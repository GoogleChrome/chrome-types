
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
 * @param {{[name: string]: chromeTypes.TypeSpec} | chromeTypes.TypeSpec[] | undefined} source
 * @param {string} parent
 */
export function flatten(source, parent) {
  if (!source) {
    return {};
  }

  /** @type {{[name: string]: chromeTypes.TypeSpec}} */
  const dict = {};

  // Convert an array to the dictionary form instead.
  if (Array.isArray(source)) {
    for (const p of source) {
      const cid = p.id ?? p.name;
      if (cid === undefined) {
        throw new Error(`bad property: ${cid} parent=${parent}`);
      }
      dict[`${parent}.${cid}`] = p;
    }
  } else {
    for (const name in source) {
      const p = source[name];
      const cid = p.id ?? p.name;
  
      if (cid !== undefined && cid !== name) {
        throw new Error(`bad property: parent dict ${name}, ${cid}`);
      }
  
      dict[`${parent}.${name}`] = p;
    }
  }

  return dict;
}


/**
 * @param {{[name: string]: chromeTypes.TypeSpec} | chromeTypes.TypeSpec[] | undefined} source
 * @param {string} parent
 * @param {(spec: chromeTypes.TypeSpec, id: string) => void} fn
 */
export function forEach(source, parent, fn) {
  const dict = flatten(source, parent);
  for (const id in dict) {
    const o = dict[id];
    if (o.nodoc) {
      continue;
    }

    fn(o, id);
  }
}


/**
 * @param {chromeTypes.TypeSpec} source
 * @param {string} id
 */
export function propertiesFor(source, id) {

  /** @type {{[id: string]: chromeTypes.TypeSpec}} */
  const out = {};

  forEach(source.properties, id, (prop, id) => {
    out[id] = prop;
  });

  forEach(source.events, id, (prop, id) => {
    const { returns, parameters, type, ...outer } = prop;
    if (type !== 'function') {
      console.warn('got declarative event', prop);
      // TODO: can happen in declarative event?
      // throw new Error(`got bad event type: ${JSON.stringify(prop)}`);
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
