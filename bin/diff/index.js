#!/usr/bin/env node
/**
 * Copyright 2020 Google LLC
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


import mri from 'mri';
import * as types from '../../types/symbol.js';
import allVersions from './lib/versions.js';


const options = mri(process.argv.slice(2), {
  boolean: ['help'],
  alias: {
    'help': ['h'],
  },
});


if (options.help) {
  console.info(`Usage: ./index.js [options]

Updates the version-data.json file from versioned Chrome files.

Options:
  TODO
`);
  process.exit(0);
}


/**
 * The minimum version to look at. Notably, 39 was when Event<T> was defined, and we expect that
 * template type.
 */
const CHROME_MIN = 39;


// TODO(samthor): This process can work forward from previous data. For now we run it all at once
// as it only takes about ~3 minutes on my workstation.

/** @type {{[name: string]: types.SymbolInfo}} */
const symbols = {};

/** @type {Set<string>} */
const activeSymbols = new Set(Object.keys(symbols));

/** @type {number=} */
let previousVersion = undefined;

// TODO(samthor): Make this a command-line param
const {pathname} = new URL('../../versions', import.meta.url);
const asyncGeneratorVersions = allVersions(pathname, {min: CHROME_MIN});
// @ts-ignore
for await (const {version, data} of asyncGeneratorVersions) {
  processVersion(version, data);
  previousVersion = version;
}

const out = {version: previousVersion, symbols};
process.stdout.write(JSON.stringify(out, undefined, 2));


/**
 * @param {number} version
 * @param {{[name: string]: types.RawSymbolInfo}} data
 */
function processVersion(version, data) {
  const isFirstVersion = (previousVersion === undefined);
  console.warn('At version', version);

  for (const name in data) {
    const raw = data[name];
    let info = symbols[name];

    // Have we not seen this symbol before? Create it if so.
    if (info === undefined || shouldResetRelease(info.release, raw.release, name)) {
      info = symbols[name] = {};

      // TODO(samthor): This is likely where some version issues will show up. If all of the raw
      // data was perfect, we'd see a transition of APIs from:
      //
      //   - [optional] empty/before release 
      //   - [optional] dev release
      //   - [optional] beta release
      //   - stable release
      //   - [optional] deprecated
      //   - [optional] removed
      //
      // ... but our data often doesn't do that. As soon as we see a release change
      // (dev/beta/stable) all info is reset. We warn if this happens in the wrong order (e.g.,
      // stable API is reverted to beta).

      info.low = isFirstVersion ? 0 : version;
      if (raw.release) {
        info.release = raw.release;
      }

      activeSymbols.add(name);
    }

    // Did this symbol disappear then reappear?
    if (info.high !== undefined) {
      console.warn(`symbol reappeared at ${version}, prev high ${info.high}: ${name}`);
      delete info.high;
    }

    // Maybe mark this as deprecated.
    if (raw.deprecated) {
      if (isFirstVersion) {
        // We don't know _when_ this was deprecated.
        info.deprecated = -1;
      } else {
        info.deprecated = Math.min(info.deprecated ?? version, version);
      }
    } else if (info.deprecated) {
      console.warn(`symbol became un-deprecated at ${version}, prev deprecated ${info.deprecated}: ${name}`);
      delete info.deprecated;
    }
  }

  // We won't see any symbols disappear on the first version, bail.
  if (isFirstVersion) {
    return;
  }

  // Check every existing symbol to see if it has disappeared.
  for (const name of activeSymbols) {
    if (name in data) {
      continue; // was here
    }
    const info = symbols[name];
    info.high = previousVersion;
    activeSymbols.delete(name);
  }
}


/**
 * @param {types.Channel|undefined} low
 * @param {types.Channel|undefined} high
 * @param {string} name
 * @return {boolean}
 */
function shouldResetRelease(low, high, name) {
  low = low ?? 'stable';
  high = high ?? 'stable';

  /** @type {types.Channel[]} */
  const order = ['stable', 'beta', 'dev'];

  const lowIndex = order.indexOf(low);
  const highIndex = order.indexOf(high);

  if (highIndex > lowIndex) {
    console.warn(`saw release '${high}' after '${low}': ${name}`);
  }
  return highIndex !== lowIndex;
}

