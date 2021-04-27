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

import {exec} from '../lib/exec.js';
import fetch from 'node-fetch';
import * as types from '../types/index.js';
import { tarToFiles } from '../lib/source/tar.js';
import semver from 'semver';
import { generateLinesHash } from '../lib/hash.js';
import * as fs from 'fs';
import * as path from 'path';


const filesToCopy = ['README.md', 'LICENSE'];


// chdir to 'prepare-types' in the script's directory.
process.chdir(new URL('./prepare-types', import.meta.url).pathname);


try {
  fs.rmSync('work', {recursive: true});
} catch {}
fs.mkdirSync('work');

filesToCopy.forEach((file) => {
  fs.copyFileSync(file, path.join('work', file));
});

const {code, out} = await exec(['npm', 'view', 'chrome-types', '--json']);
if (code) {
  throw new Error(`could not get info on chrome-types: ${code}`);
}
const npmInfo = JSON.parse(out.toString('utf-8'));

/** @type {string} */
const latestVersion = npmInfo.version;

const url = new URL(npmInfo.dist.tarball);
const r = await fetch(url);
const files = await tarToFiles(await r.buffer());

// const previousPackageJson = JSON.parse(files['package/package.json'].toString('utf-8'));
// console.info(previousPackageJson);

let anyChange = false;

// Either recreate or republish the old history file.
const updatedHistory = await maybeUpdateHistory(files['package/history.json']);
if (updatedHistory) {
  anyChange = true;
  console.warn('History updated for version', updatedHistory.version);
  fs.writeFileSync('work/history.json', JSON.stringify(updatedHistory, undefined, 2));
} else {
  fs.writeFileSync('work/history.json', files['package/history.json']);
}

// Always generate types anew, in case something changed, as this runs at HEAD.
const updatedTypesBuffer = await generateTypes();
const updatedTypesHash = generateLinesHash(updatedTypesBuffer);

const previousTypesBuffer = files['package/index.d.ts'];
const previousTypesHash = generateLinesHash(previousTypesBuffer);

if (updatedTypesHash !== previousTypesHash) {
  anyChange = true;
  console.warn('Types update', previousTypesHash, '=>', updatedTypesHash);
  fs.writeFileSync('work/index.d.ts', updatedTypesBuffer);
} else {
  fs.writeFileSync('work/index.d.ts', previousTypesBuffer);
}

const packageJson = JSON.parse(fs.readFileSync('package.template.json', 'utf-8'));

// If there were changes, then rev the version.
if (anyChange) {
  const updatedVersion = semver.inc(latestVersion, 'patch');
  console.warn('Updating version', latestVersion, '=>', updatedVersion);
  packageJson.version = updatedVersion;
} else {
  console.warn('Using same latest version', latestVersion);
  packageJson.version = latestVersion;
}

fs.writeFileSync('work/package.json', JSON.stringify(packageJson, undefined, 2));



/**
 * @param {Buffer} previousBuffer
 * @return {Promise<types.VersionDataFile?>}
 */
async function maybeUpdateHistory(previousBuffer) {
  const {code, out} = await exec(['node', '../history.js', '-i'], {stdin: previousBuffer});
  if (code) {
    throw new Error(`could not redo history: ${code}`);
  }

  /** @type {types.VersionDataFile} */
  const previousHistory = JSON.parse(previousBuffer.toString('utf-8'));

  /** @type {types.VersionDataFile} */
  const updatedHistory = JSON.parse(out.toString('utf-8'));
  if (updatedHistory.version === undefined) {
    throw new Error('bad updated history');
  }
  if (updatedHistory.version === previousHistory.version) {
    // do nothing
    // TODO: check symbol count?
    return null;
  }

  return updatedHistory;
}


/**
 * @return {Promise<Buffer>}
 */
async function generateTypes() {
  const {code, out} = await exec(['node', '../tsd.js', '-d', 'work/history.json']);
  if (code) {
    throw new Error(`could not generate types: ${code}`);
  }
  return out;
}
