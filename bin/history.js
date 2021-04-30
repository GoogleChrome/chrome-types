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

import * as versions from '../lib/chrome/versions.js';
import {prepareNamespaces} from '../lib/gen/main.js';
import {buildLimit} from '../lib/limit.js';
import * as types from '../types/index.js';
import mri from 'mri';
import * as fs from 'fs';


/**
 * If the on-disk revision doesn't match this number, then recreate the entire file.
 */
const GENERATED_REVISION = 2;


// nb. Before 53, we see more parsing issues in feature files. 53 was released on 2016-08-31.
const LOW_VERSION = 53;
let effectiveLow = LOW_VERSION;
let outputLow = LOW_VERSION;


const argv = mri(process.argv.slice(2), {
  boolean: ['input', 'help'],
  alias: {
    'help': ['h'],
    'input': ['i'],
  },
  unknown: (v) => {
    throw new Error(`unexpected flag: ${v}`);
  },
});


/**
 * @type {types.SymbolsVersionInfo}
 */
const allSymbols = {};


if (argv.help) {
  console.warn(`Usage: history.js [-i]

  - Generates historic data for Chrome extensions up to the current stable release.
  - If run anew, will start at Chrome ${LOW_VERSION} (inclusive).
  - If -i if specified, then previous output must be passed via STDIN and this will limit work.
`);
  process.exit(0);

} else if (argv.input) {
  const raw = await /** @type {Promise<Buffer>} */ (new Promise((r) => {
    /** @type {Buffer[]} */
    const parts = [];
    process.stdin.on('data', (part) => parts.push(part));
    process.stdin.on('close', () => r(Buffer.concat(parts)));
  }));

  /** @type {types.VersionDataFile} */
  const cand = JSON.parse(raw.toString('utf-8'));

  if (!cand.version || cand.version < LOW_VERSION || (~~cand.version) !== cand.version) {
    throw new Error(`invalid history file, bad version: ${cand.version}`);
  }

  if (cand.revision === GENERATED_REVISION) {
    // Step over the previous version, we have that.
    effectiveLow = cand.version + 1;

    // Record the generated low version.
    outputLow = cand.low;

    // Clone all previously seen symbols.
    Object.assign(allSymbols, cand.symbols);
  } else {
    console.warn('History file revision changed, regenerate all:', cand.revision, '=>', GENERATED_REVISION);
  }
}


const releaseDatesPromise = versions.releaseDates();
const chromeVersions = await versions.chromeVersions();
const releaseDates = await releaseDatesPromise;

const stableVersionInfo = releaseDates.get('stable');
if (!stableVersionInfo?.release) {
  throw new Error(`missing stable info`);
}
const {release: stableVersion} = stableVersionInfo;



/** @type {{version: number, revision: string}[]} */
const versionsToFetch = [];
for (let i = effectiveLow; i <= stableVersion; ++i) {
  const raw = chromeVersions.get(i);
  if (!raw) {
    throw new Error(`no git information for Chrome ${i}`);
  }
  versionsToFetch.push({version: i, revision: raw.hash});
}

if (versionsToFetch.length) {
  console.warn(versionsToFetch);
} else {
  console.warn(`nothing to do; low=${effectiveLow} stable=${stableVersion}`);
}


/**
 * @param {{version: number, revision: string}} _arg
 */
const fetchChrome = async ({version, revision}) => {
  const options = {revision, cacheIdlParse: false};

  try {
    const {namespaces} = await prepareNamespaces(options);
    console.warn('Parsed Chrome', version, 'with', Object.keys(namespaces).length, 'namespaces');

    /** @type {{[path: string]: {channel: types.Channel, deprecated: boolean}}} */
    const symbols = {};

    for (const name in namespaces) {
      const namespace = namespaces[name];
      symbols[name] = {
        channel: namespace.canonicalFeature.supportedInChannel ?? 'stable',
        deprecated: namespace.deprecated !== undefined,
      };

      namespace.traverse((path, prop) => {
        if (prop.nodoc) {
          throw new Error(`nodocRemove didn't filter nodoc prop`);
        }
        const key = path.join('.');
        if (key in symbols) {
          throw new Error(`found duplicate path for Chrome ${version}: ${key}`);
        }
        symbols[key] = {
          channel: prop.canonicalFeature.supportedInChannel ?? 'stable',
          deprecated: prop.deprecated !== undefined,
        };
        return undefined;
      });
    }

    return {version, namespaces, symbols};
  } catch (e) {
    // TODO(samthor): Could we just skip bad old versions?
    console.error('Failed to prepare:', version, revision);
    throw e;
  }
};

const data = await Promise.all(versionsToFetch.map(buildLimit(fetchChrome, 2)));

/** @type {Set<string>} */
const tombstones = new Set();

data.forEach(({version, symbols}) => {
  const isFirstVersion = (Object.keys(allSymbols).length === 0);

  for (const path in symbols) {
    const {channel, deprecated} = symbols[path];
    const data = allSymbols[path] ?? {};

    // If this is the first set of data, pretend that our "version" is zero.
    if (isFirstVersion) {
      allSymbols[path] = data;
      if (channel !== 'stable') {
        data.channel = channel;
      }
      if (deprecated) {
        data.deprecated = 0;
      }
      continue;
    }

    // This is a brand new API.
    if (!(path in allSymbols)) {
      allSymbols[path] = data;

      if (channel === 'stable') {
        console.warn(path, 'started stable at', version);
        data.low = version;
      } else {
        data.channel = channel;
      }
      if (deprecated) {
        data.deprecated = version;
      }
      continue;
    }

    // This is updating a previously seen API.
    if (channel === 'stable') {
      if (data.channel) {
        console.warn(path, 'became stable at', version);
        delete data.channel;
        data.low = version;  // otherwise it should already be set (or blank for 'old')
      } else {
        // already up-to-date!
      }
    } else {
      if (data.low || data.channel === undefined) {
        console.warn(path, 'got stable =>', channel, 'was seen at', data.low, 'now', version);
        delete data.low;
      }
      data.channel = channel;
    }

    if (deprecated && data.deprecated === undefined) {
      data.deprecated = version;
    } else if (data.deprecated !== undefined && !deprecated) {
      console.warn(path, 'un-deprecating api', version);
      delete data.deprecated;
    }
  }

  for (const path in allSymbols) {
    const inUpdate = path in symbols;
    if (inUpdate) {
      if (tombstones.has(path)) {
        console.warn(path, 'became alive again');
      }
      tombstones.delete(path);
    } else {
      tombstones.add(path);
    }
  }
});

console.warn('tombstoning APIs', [...tombstones]);
tombstones.forEach((path) => {
  delete allSymbols[path];
});


// Add in any override symbols.
const symbolsOverridePath = new URL('./history/symbols-override.json', import.meta.url).pathname;
const overrides = JSON.parse(fs.readFileSync(symbolsOverridePath, 'utf-8'));
if (Object.keys(overrides).length) {
  console.warn('Adding overrides to symbols', overrides);
  Object.assign(allSymbols, overrides);
}


/** @type {types.VersionDataFile} */
const out = {
  low: outputLow,
  version: stableVersion,
  revision: GENERATED_REVISION,
  generated: (new Date()).toISOString(),
  symbols: allSymbols,
};
console.info(JSON.stringify(out, undefined, 2));

