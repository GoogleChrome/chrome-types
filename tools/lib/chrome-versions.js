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
 * @fileoverview Fetches the revision for both the head revision of Chromium source, as well as
 * historic major releases. This relies on the `git` being installed.
 */


import { promisify } from 'util';
import * as childProcess from 'child_process';
import semver from 'semver';
import * as chromeTypes from '../../types/chrome.js';
import fetch from 'node-fetch';


const execFile = promisify(childProcess.execFile);


const tagPrefix = 'refs/tags/';


const repoUrl = 'https://chromium.googlesource.com/chromium/src.git';


const versionHistoryUrl = 'https://versionhistory.googleapis.com/v1/chrome/platforms/all/channels/stable/versions/';


/**
 * @param {string} tag
 */
export async function splitChromeRelease(tag) {
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

  return { release: major, rest };
}


/**
 * Fetches and finds all the major release information for Chrome. Invokes git on the command-line
 * internally.
 *
 * This doesn't provide information on beta/dev/stable status, just the latest git tags found.
 * The results are in reverse order of release (so iteration starts at the most recent version).
 *
 * @return {Promise<chromeTypes.ChromeVersionsData>} major version to its latest tag
 */
export async function chromeVersions() {
  const { stdout } = await execFile('git', ['ls-remote', '--tags', '--heads', repoUrl], {
    // The default buffer is 1mb, but as of 2021-10, the output here is 1.3mb. Set to 32mb.
    maxBuffer: 1024 * 1024 * 32,
  });

  let headRevision = '';

  /** @type {Map<number, {version: string, rest: string, revision: string}>} */
  const majorVersions = new Map();

  for (const line of stdout.split('\n')) {
    const [revision, rawTag] = line.split('\t');

    if (rawTag === 'refs/heads/main') {
      headRevision = revision;
      continue;
    }

    // Find a valid Chrome release number after "refs/tags/".
    if (!rawTag?.startsWith(tagPrefix)) {
      continue;
    }
    const tag = rawTag.substr(tagPrefix.length);
    const info = await splitChromeRelease(tag);
    if (!info) {
      continue;
    }

    // Store the largest semver found for this major version.
    const prev = majorVersions.get(info.release);
    if (prev !== undefined && semver.lt(info.rest, prev.rest)) {
      continue;
    }
    majorVersions.set(info.release, { version: tag, rest: info.rest, revision });
  }

  /** @type {Map<number, {version: string, revision: string}>} */
  const releaseMajorVersions = new Map();

  // Reverse the order of the major releases and store in a new Map (which retains order).
  // Iterating through the map will return the highest version in source first.
  const numericReverseSort = (a, b) => b - a;
  Array.from(majorVersions.keys()).sort(numericReverseSort).map((major) => {
    const ret = majorVersions.get(major);
    if (!ret) {
      throw new Error(`bad assertion`);
    }
    // Remove `rest` field, we don't need it in the output.
    const { rest: _rest, ...value } = ret;
    releaseMajorVersions.set(major, value);
  });

  return {
    head: headRevision,
    releases: releaseMajorVersions,
  };
}


/**
 * Fetches and finds the current stable version of Chrome.
 *
 * @return {Promise<number>}
 */
export async function chromePublishedStable() {
  const r = await fetch(versionHistoryUrl);
  const data = /** @type {chromeTypes.VersionHistoryData} */ (await r.json());

  for (const version of data.versions) {
    const [major] = version.version.split('.');
    const numericRelease = parseInt(major);
    if (numericRelease) {
      return numericRelease;
    }
  }

  throw new Error(`could not find stable Chrome release`);
}
