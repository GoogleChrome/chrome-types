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
import {throwExec} from './lib/runners.js';
import * as crypto from 'crypto';


const {pathname: __filename} = new URL(import.meta.url);
const __dirname = path.dirname(__filename);


const hashLength = 16;
const singleLineCommentRegexp = /\s*\/\/.*$/gm;


/**
 * @param {string} outputDir
 * @param {string} version
 * @param {string} revision
 * @param {boolean} check
 * @return {Promise<string>}
 */
async function wrapBuild(outputDir, version, revision, check) {
  fs.mkdirSync(outputDir, {recursive: true});
  let allContents = '';

  const generatedString = `// For Chrome ${version} at ${revision}\n// Generated at ${new Date()}\n\n`;
  const preamble = fs.readFileSync(path.join(__dirname, 'preamble.d.ts'));

  const files = await build(revision, log);
  for (const name in files) {
    const target = path.join(outputDir, name);
    const contents = preamble + generatedString + files[name];
    fs.writeFileSync(target, contents);

    allContents += contents;

    if (check) {
      await throwExec(['tsc', '--noEmit', target]);
    }
  }

  return generateLinesHash(allContents);
}


/**
 * Generates a hash for the given source, while stripping all single-line comments. This is helpful
 * to still include creation time (and so on) while not effecting the hash.
 *
 * @param {string} raw
 * @return {string}
 */
function generateLinesHash(raw) {
  raw = raw.replace(singleLineCommentRegexp, '');

  // This is not used for a cryptographic purpose. It's just a hash of the build to compare against
  // other builds.
  const c = crypto.createHash('sha256');
  c.update(raw);
  const digest = c.digest('hex');

  const out = digest.substr(0, hashLength);
  if (!raw.length || out.length !== hashLength) {
    throw new Error(`could not generate hash: ${out}`);
  }

  return out;
}


const options = mri(process.argv.slice(2), {
  boolean: ['tip', 'help', 'quiet', 'skip-check'],
  string: ['output'],
  alias: {
    'help': ['h'],
    'tip': ['t'],
    'release': ['m'],
    'quiet': ['q'],
    'output': ['o'],
    'skip-check': ['s'],
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
  -s, --skip-check     skip checking with tsc
`);
  process.exit(0);
}


const log = options.quiet ? () => {} : (message) => {
  const now = ('' + performance.now().toFixed(0)).padStart(6);
  console.warn(color.dim(`[${now}]`), message);
};

const out = {
  'version': '',
  'build': '',
};


if (options.tip) {
  // Build the very latest version without a specific Chrome version.
  out.build = await wrapBuild(options.output, 'HEAD', chromeHeadBranch, !options['skip-check']);
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

  out.version = `${release}.${rest}`;

  log(`Fetching for Chrome ${color.red(out.version)}, revision ${color.red(revision)}...`);
  out.build = await wrapBuild(options.output, out.version, revision, !options['skip-check']);
}

console.info(JSON.stringify(out));
