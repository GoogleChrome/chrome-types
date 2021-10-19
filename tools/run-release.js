#!/usr/bin/env node

import { run, toolInvoke, rootDir } from './lib/spawn-helper.js';
import * as path from 'path';
import * as fs from 'fs';
import log from 'fancy-log';
import { readFromCache, writeToCache } from './lib/cache-helper.js';


const distDir = path.join(rootDir, 'dist');


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
const allTypesContent = toolInvoke('render-tsd.js', { input: chromePayload, args: ['-a'] });
const allTypesFile = path.join(distDir, '_all.d.ts');
fs.writeFileSync(allTypesFile, allTypesContent);
typescriptCheck(allTypesFile);


log('Done!');
