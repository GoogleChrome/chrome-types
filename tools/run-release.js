#!/usr/bin/env node

import { run, toolInvoke, rootDir } from './lib/spawn-helper.js';
import * as path from 'path';
import * as fs from 'fs';
import log from 'fancy-log';
import { readFromCache, writeToCache } from './lib/cache-helper.js';
import semver from 'semver';
import { generateLinesHash } from './lib/line-hash.js';
import fetch from 'node-fetch';


const distDir = path.join(rootDir, 'dist');


/**
 * @typedef {{
 *   config?: {[name: string]: any},
 *   version?: string,
 * }}
 * @type {never}
 */
var PackageJSONType;


/**
 * @param {string} p
 */
function typescriptCheck(p) {
  run(['./node_modules/.bin/tsc', p], { stdoutInherit: true, cwd: rootDir });
}


log('Maybe updating version data...');
const prepareHistoryOptions = {};
const existingHistory = readFromCache('history.json');
if (existingHistory) {
  prepareHistoryOptions.input = existingHistory;
  prepareHistoryOptions.args = [ '-i' ];
}
const updatedHistoryFile = toolInvoke('prepare-history.js', prepareHistoryOptions);
writeToCache('history.json', updatedHistoryFile);


log('Fetching Chrome payload at HEAD...');
const chromePayload = toolInvoke('prepare.js');


log('Building types for MV3+...');
const indexTypesContent = toolInvoke('render-tsd.js', { input: chromePayload, args: ['-s', '.cache/history.json'] });
const indexTypesFile = path.join(distDir, 'index.d.ts');
fs.writeFileSync(indexTypesFile, indexTypesContent);
typescriptCheck(indexTypesFile);


log('Building types for all...');
const allTypesContent = toolInvoke('render-tsd.js', { input: chromePayload, args: ['-a', '-s', '.cache/history.json'] });
const allTypesFile = path.join(distDir, '_all.d.ts');
fs.writeFileSync(allTypesFile, allTypesContent);
typescriptCheck(allTypesFile);


log('Fetching prior published info...');
const r = await fetch('https://registry.npmjs.org/chrome-types/latest');
const publishedInfo = /** @type {PackageJSONType} */ (await r.json());
const previousHash = publishedInfo.config?.['build-hash'] ?? '';
const priorVersion = publishedInfo.version ?? '';


log('Determining change...');
const buildHash = generateLinesHash(indexTypesContent, allTypesContent);
const wasChange = buildHash !== previousHash;
log(wasChange ? `Hash change: ${previousHash} => ${buildHash}` : `No change: ${buildHash}`);


log('Updating package.json...');
/** @type {PackageJSONType} */
const packageTemplate = JSON.parse(fs.readFileSync(path.join(distDir, 'package.template.json'), 'utf-8'));
packageTemplate.version = wasChange ? (semver.inc(priorVersion, 'patch') ?? '') : priorVersion;
packageTemplate.config ??= {};
packageTemplate.config['build-hash'] = buildHash;
fs.writeFileSync(path.join(distDir, 'package.json'), JSON.stringify(packageTemplate));


log(`Was v${publishedInfo.version}, now v${packageTemplate.version}`)
log('Done!');
