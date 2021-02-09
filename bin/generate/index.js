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
import {chromeVersions, releaseDates} from './lib/versions.js';
import * as path from 'path';
import * as fs from 'fs';
import build from './lib/build.js';
import * as color from 'colorette';
import {chromeHeadBranch} from './lib/git.js';
import {performance} from 'perf_hooks';


const {pathname: __filename} = new URL(import.meta.url);
const __dirname = path.dirname(__filename);


/**
 * @param {string} outputDir
 * @param {string} version
 * @param {string} revision
 */
async function wrapBuild(outputDir, version, revision) {
  fs.mkdirSync(outputDir, {recursive: true});

  const generatedString = `// For Chrome ${version} at ${revision}\n\n`;
  const preamble = fs.readFileSync(path.join(__dirname, 'preamble.d.ts'));

  const files = await build(path.join(__dirname, '.work'), revision, log);
  for (const name in files) {
    fs.writeFileSync(path.join(outputDir, name), preamble + generatedString + files[name]);
  }
}


const options = mri(process.argv.slice(2), {
  boolean: ['tip', 'help', 'quiet'],
  string: ['output'],
  alias: {
    'help': ['h'],
    'tip': ['t'],
    'release': ['m'],
    'quiet': ['q'],
    'output': ['o'],
  },
  default: {
    'release': 'stable',
    'output': 'npm/',
  },
});


if (options.help) {
  console.info(`Usage: ./index.js [options]

Builds TypeScript Definition files from Chromium source. This involves a few
moving parts. By default, this fetches information for the current stable.

Options:
  -t, --tip            fetch tip rather than a release
  -m, --release <n>    fetch a major release: number OR 'stable', 'beta', 'dev'
  -o, --output         output path (default npm/)
  -q, --quiet          quiet mode
`);
  process.exit(0);
}


const log = options.quiet ? () => {} : (message) => {
  const now = ('' + performance.now().toFixed(0)).padStart(6);
  console.warn(color.dim(`[${now}]`), message);
};


if (options.tip) {
  // Build the very latest version without a specific Chrome version.
  await wrapBuild(options.output, 'HEAD', chromeHeadBranch);
} else {
  /** @type {string} */
  let revision;

  /** @type {{release: number}} */
  let {release = 0} = options;

  /** @type {string} */
  let rest;

  const maybeReleaseNumber = parseInt(options.release);
  if (maybeReleaseNumber) {
    const allVersions = await chromeVersions(log);
    const data = allVersions.get(maybeReleaseNumber);
    if (data === undefined) {
      throw new Error(`could not find Chrome ${maybeReleaseNumber}`);
    }
    revision = data.hash;
    rest = data.rest;
  } else if (typeof options.release === 'string') {
    // Fetch information about the latest stable.
    const dates = await releaseDates(log);
    const stableInfo = dates.get(options.release);
    if (stableInfo === undefined) {
      throw new Error(`could not find Chrome info for: ${options.release}`);
    }
    log(`Looked up ${color.magenta(options.release)}...`);
    ({revision, rest, release} = stableInfo);
  } else {
    throw new Error(`unknown release request: ${options.release}`);
  }

  const version = `${release}.${rest}`;

  log(`Fetching for Chrome ${color.red(version)}, revision ${color.red(revision)}...`);
  await wrapBuild(options.output, version, revision);
  console.info(version);
}
