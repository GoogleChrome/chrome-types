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


/**
 * @fileoverview Creates or updates a `history.json` file containing historic appearance of symbols
 * in Chrome's extensions APIs. Internally invokes the prepare and render-symbols scripts to
 * find symbol information.
 */


import { toolInvoke } from './lib/spawn-helper.js';
import { applyRelease } from './lib/release-history.js';
import log from 'fancy-log';
import { chromePublishedStable } from './lib/chrome-versions.js';
import * as chromeTypes from '../types/chrome.js';
import mri from 'mri';
import getStdin from 'get-stdin';


// Chrome 3 has schemas, but known-namespaces.txt rejects their chrome.* spelling, so it is an
// empty baseline and every API present in Chrome 4 gets low 4.
const defaultLowVersion = 3;


// Rev this if something changes in the history file.
const expectedRevision = 6;


async function run() {
  const argv = mri(process.argv.slice(2), {
    boolean: ['input', 'help'],
    default: {'low': defaultLowVersion},
    alias: {
      'low': ['l'],
      'help': ['h'],
      'input': ['i'],
    },
    unknown: (v) => {
      throw new Error(`unexpected flag: ${v}`);
    },
  });

  let lowVersion = Math.round(+argv.low);
  let outputLowVersion = lowVersion;

  /** @type {chromeTypes.AllReleasesSymbolData} */
  const allSymbols = {};

  if (argv.help || !lowVersion) {
    console.warn(`Usage: prepare-history.js > out.json

Generates historic data for Chrome extensions up to the current stable release.

Options:
  -l, --low            specifies low version to start at (default ${defaultLowVersion})
  -i, --input          accepts previous JSON on stdin and works from that version
`);
    process.exit(0);
  }

  if (argv.input) {
    /** @type {chromeTypes.HistoricSymbolsPayload} */
    const o = JSON.parse(await getStdin());
    if (o.revision === expectedRevision) {
      lowVersion = o.high + 1;
      outputLowVersion = o.low;  // we didn't actually change low version

      Object.assign(allSymbols, o.symbols);
    } else {
      log.warn(`Found old history revision, re-running...`);
    }
  }

  // Find where we need to move up to. We only target published Chrome stable.
  const highVersion = await chromePublishedStable();
  if (lowVersion <= highVersion) {
    log.warn(`Working from releases: [${lowVersion}-${highVersion}]`);
  } else {
    // The loop below won't run even once.
    log.warn(`Nothing to do, up-to-date with stable release: ${highVersion}`);
  }

  for (let version = lowVersion; version <= highVersion; ++version) {

    log.warn(`Fetching Chrome payload for ${version}...`);
    const chromePayload = toolInvoke('prepare.js', { args: [version.toString()] });

    log.warn(`Generating symbols...`);
    const symbolsPayload = toolInvoke('render-symbols.js', { input: chromePayload });
    const symbols = /** @type {chromeTypes.ReleaseSymbolsData} */ (JSON.parse(symbolsPayload.toString('utf-8')));


    // The first release of a cold walk is the baseline, even when it yields no symbols.
    const isBaseline = (version === lowVersion && Object.keys(allSymbols).length === 0);
    applyRelease(allSymbols, version, symbols, isBaseline, (message) => console.warn(message));
  }


  // Generate a friendly log of the symbols that are no longer seen at the top revision. We keep
  // these in the final output anyway.
  const e = Object.entries(allSymbols)
      .map(([id, {high}]) => [id, high])
      .filter(([_, high]) => high !== highVersion);
  const lastSeenObject = Object.fromEntries(e);
  console.warn('now-missing symbols at', highVersion, lastSeenObject);


  /** @type {chromeTypes.HistoricSymbolsPayload} */
  const out = {
    low: outputLowVersion,
    high: highVersion,
    revision: expectedRevision,
    generated: (new Date()).toISOString(),
    symbols: allSymbols,
  };
  process.stdout.write(JSON.stringify(out, undefined, 2));
}

await run();
