#!/usr/bin/env node

import { toolInvoke } from './lib/spawn-helper.js';
import log from 'fancy-log';
import { chromePublishedStable } from './lib/chrome-versions.js';
import * as chromeTypes from '../types/chrome.js';




const lowVersion = 42;
const highVersion = await chromePublishedStable();



log.warn(`Working from ${lowVersion}-${highVersion}`);


/**
 * @typedef {{
 *   deprecated?: number,
 *   low?: number,
 *   high: number,
 * }}
 */
var SymbolData;


/** @type {{[id: string]: SymbolData}} */
const allSymbols = {};


for (let version = lowVersion; version <= highVersion; ++version) {

  log.warn(`Fetching Chrome payload for ${version}...`);
  const chromePayload = toolInvoke('prepare.js', { args: [version.toString()] });

  log.warn(`Generating symbols...`);
  const symbolsPayload = toolInvoke('render-symbols.js', { input: chromePayload });
  const symbols = /** @type {chromeTypes.ReleaseSymbolsData} */ (JSON.parse(symbolsPayload.toString('utf-8')));


  const isInitialSymbols = (Object.keys(allSymbols).length === 0);

  for (const id in symbols) {
    const data = allSymbols[id] ?? { high: 0 };
    data.high = version;
    allSymbols[id] = data;

    // This is a new symbol and it's not the first pass, record the seen version.
    if (!(id in allSymbols) && !isInitialSymbols) {
      console.warn(id, 'started stable at', version);
      data.low = version;
    }

    if (symbols[id].deprecated) {
      // If we're newly deprecated, this might be at "version zero" (if it's the intial pass), or a
      // later version.
      if (data.deprecated === undefined) {
        data.deprecated = isInitialSymbols ? 0 : version;
      }
    } else if (data.deprecated) {
      // This possibly never happens in practice.
      console.warn(id, 'now NOT deprecated');
      delete data.deprecated;
    }
  }
}


// Generate a friendly log of the symbols that are no longer seen at the top revision. We keep
// these in the final output anyway.
const e = Object.entries(allSymbols)
    .map(([id, {high}]) => [id, high])
    .filter(([_, high]) => high !== highVersion);
const lastSeenObject = Object.fromEntries(e);
console.warn('now-missing symbols at', highVersion, lastSeenObject);


const out = {
  low: lowVersion,
  high: highVersion,
  revision: 3,
  generated: (new Date()).toISOString(),
  symbols: allSymbols,
};
process.stdout.write(JSON.stringify(out, undefined, 2));
