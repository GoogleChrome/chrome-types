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

import {promisify} from 'util';
import * as childProcess from 'child_process';
import semver from 'semver';
import {cache} from './cache.js';
import * as color from 'colorette';
import * as featureTypes from '../types/feature.js';
import fetch from 'node-fetch';

const execFile = promisify(childProcess.execFile);
const tagRe = /^refs\/tags\/(\S+)/g;

const repoUrl = 'https://chromium.googlesource.com/chromium/src.git';

/**
 * @param {string} tag
 */
function splitChromeRelease(tag) {
  // Look for versions like "88.0.4324.47". Ignore other tags.
  const parts = tag.split('.');
  if (parts.length !== 4) {
    return;
  }

  // Pull the major Chrome release version and treat the rest as a semver (as semver only has
  // three parts).
  const major = parseInt(parts.shift() ?? '');
  if (!(major > 0.0)) {
    return;
  }

  const rest = parts.join('.');
  if (!semver.valid(rest)) {
    return;
  }

  return {release: major, rest};
}

/**
 * Fetches and finds all the major release information for Chrome. Invokes git internally.
 *
 * This doesn't provide information on beta/dev/stable status, just the latest git tags found.
 * The results are in reverse order of release (so iteration starts at the most recent version).
 *
 * @param {(v: string) => void} log helper
 * @return {Promise<Map<number, {rest: string, hash: string}>>} major version to its latest tag
 */
export async function chromeVersions(log) {
  const raw = await cache('git-ls-remote-' + repoUrl, async () => {
    const {stdout} = await execFile('git', ['ls-remote', '--tags', repoUrl], {
      // The list of tags is huge (more than the 1mb default).
      maxBuffer: 1024 * 1024 * 32,
    });
    return Buffer.from(stdout);
  });
  const stdout = raw.toString('utf-8');

  /** @type {!Map<number, {rest: string, hash: string}>} */
  const majorVersions = new Map();

  for (const line of stdout.split('\n')) {
    const [hash, rawTag] = line.split('\t');

    const tagMatch = tagRe.exec(rawTag);
    if (!tagMatch) {
      continue;
    }
    const tag = tagMatch[1];
    const info = splitChromeRelease(tag);
    if (!info) {
      continue;
    }

    // Store the largest semver found for this major version.
    const prev = majorVersions.get(info.release);
    if (prev !== undefined && semver.lt(info.rest, prev.rest)) {
      continue;
    }
    majorVersions.set(info.release, {rest: info.rest, hash});
  }

  /** @type {typeof majorVersions} */
  const releaseMajorVersions = new Map();

  // Reverse the order of the major releases and store in a new Map (which retains order).
  const numericReverseSort = (a, b) => b - a;
  Array.from(majorVersions.keys()).sort(numericReverseSort).map((major) => {
    const ret = majorVersions.get(major);
    if (!ret) {
      throw new Error(`bad assertion`);
    }
    releaseMajorVersions.set(major, ret);
  });

  log(`Found ${color.blue('' + releaseMajorVersions.size)} major Chrome releases`);
  return releaseMajorVersions;
}


/**
 * @param {(v: string) => void} log helper
 */
export async function releaseDates(log) {
  const response = await fetch('https://omahaproxy.appspot.com/all.json');

  /**
   * @type {{
   *   os: string,
   *   versions: {
   *     channel: featureTypes.Channel,
   *     version: string,
   *     current_reldate: string,
   *     branch_commit: string,
   *   }[],
   * }[]}
   * */
  const data = await response.json();
  const singleRow = data.find(({os}) => os === 'mac');
  if (!singleRow) {
    throw new Error(`could not find single-plat versions`)
  }

  /** @type {Map<featureTypes.Channel, {release: number, rest: string, when: Date, revision: string}>} */
  const out = new Map();
  for (const row of singleRow.versions) {
    // This date is for the specific current point release, not the branch.
    // Also, the raw data is in MM/DD/YY, but the Date ctor assumes that anyway.
    const when = new Date(row.current_reldate);

    const info = splitChromeRelease(row.version);
    if (!info) {
      throw new Error(`could not parse chrome version: ${row.version}`);
    }

    out.set(row.channel, {release: info.release, rest: info.rest, when, revision: row.branch_commit});
  }
  return out;
}
