
import * as chromeTypes from '../../types/chrome.js';


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
