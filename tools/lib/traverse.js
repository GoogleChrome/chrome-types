
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


/**
 * @param {chromeTypes.TypeSpec} spec
 */
export function expandFunctionParams(spec) {
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
    expansions.push([
      spec.returns ?? { type: 'void' },
      ...result,
    ]);
  }

  return expansions;
}
