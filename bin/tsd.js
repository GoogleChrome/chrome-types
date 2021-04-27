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
 * @fileoverview Generates a .d.ts file for the latest Chrome version (main branch).
 */


import { reformatDTSFile } from '../lib/comment.js';
import { prepareNamespaces } from '../lib/gen/main.js';
import { renderNamespaces } from '../lib/gen/render.js';
import * as fs from 'fs';
import * as types from '../types/index.js';
import fetch from 'node-fetch';
import mri from 'mri';


const argv = mri(process.argv.slice(2), {
  boolean: ['help'],
  alias: {
    'help': ['h'],
    'data': ['d'],
  },
  unknown: (v) => {
    throw new Error(`unexpected flag: ${v}`);
  },
});


if (argv.help) {
  console.warn(`Usage: tsd.js [-d path]

  - Generates .d.ts file for Chrome extensions (MV3+ only)
  - Specify optional version data with -d, local file or URL
`);
  process.exit(0);

}

/** @type {types.VersionDataFile} */
let versionData;


if (argv.data) {
  const u = new URL(argv.data, import.meta.url);
  if (u.protocol === 'file:') {
    // don't use "u", it's relative to import dir
    versionData = JSON.parse(fs.readFileSync(argv.data, 'utf-8'));
  } else {
    const response = await fetch(u);
    versionData = await response.json();
  }
  console.warn('Loaded version data for', versionData.version, 'with', Object.keys(versionData.symbols).length, 'symbols');
} else {
  console.warn('Not using version data');
  versionData = {low: 0, version: 0, generated: '', symbols: {}};
}


const now = new Date();

const {namespaces, stats} = await prepareNamespaces({symbols: versionData.symbols});

console.warn('Skipped namespaces:', stats.skipped);

const raw = renderNamespaces(Object.values(namespaces));
const s = reformatDTSFile(raw);

const {pathname: preamblePath} = new URL('../preamble.d.ts', import.meta.url);

process.stdout.write(fs.readFileSync(preamblePath));
process.stdout.write(`\n\n// Generated on ${now}\n\n\n`);
process.stdout.write(s);
