import {promisify} from 'util';
import childProcess from 'child_process';
import semver from 'semver';
import {cache} from '../lib/cache.js';
import log from 'fancy-log';
import chalk from 'chalk';

const execFile = promisify(childProcess.execFile);
const tagRe = /^refs\/tags\/(\S+)/g;

const repoUrl = 'https://chromium.googlesource.com/chromium/src.git';

/**
 * Fetches and finds all the major release information for Chrome. Invokes git internally.
 *
 * This doesn't provide information on beta/dev/stable status, just the latest git tags found.
 * The results are in reverse order of release (so iteration starts at the most recent version).
 *
 * @return {Promise<Map<number, {rest: string, hash: string}>>} major version to its latest tag
 */
export async function chromeVersions() {
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

    // Look for versions like "88.0.4324.47". Ignore other tags.
    const parts = tag.split('.');
    if (parts.length !== 4) {
      continue;
    }

    // Pull the major Chrome release version and treat the rest as a semver (as semver only has
    // three parts).
    const major = parseInt(parts.shift());
    if (!(major > 0.0)) {
      continue;  // continue if major is NaN
    }

    const rest = parts.join('.');
    if (!semver.valid(rest)) {
      continue;
    }

    // Store the largest semver found for this major version.
    const prev = majorVersions.get(major);
    if (prev !== undefined && semver.lt(rest, prev.rest)) {
      continue;
    }
    majorVersions.set(major, {rest, hash});
  }

  /** @type {typeof majorVersions} */
  const releaseMajorVersions = new Map();

  // Reverse the order of the major releases and store in a new Map (which retains order).
  const numericReverseSort = (a, b) => b - a;
  Array.from(majorVersions.keys()).sort(numericReverseSort).map((major) => {
    releaseMajorVersions.set(major, majorVersions.get(major));
  });

  log(`Found ${chalk.blue(releaseMajorVersions.size)} major Chrome releases`);
  return releaseMajorVersions;
}
