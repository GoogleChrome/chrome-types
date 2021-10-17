#!/usr/bin/env node

import { run, toolInvoke, rootDir } from './lib/spawn-helper.js';
import * as path from 'path';
import * as fs from 'fs';
import log from 'fancy-log';
import { chromePublishedStable } from './lib/chrome-versions.js';


const distDir = path.join(rootDir, 'dist');


/**
 * @param {string} p
 */
function typescriptCheck(p) {
  run(['./node_modules/.bin/tsc', p], { stdoutInherit: true, cwd: rootDir });
}


log('Finding Chrome stable release...');
const stableChromeRelease = await chromePublishedStable();
log('Chrome stable is:', stableChromeRelease);

log('Fetching Chrome payload...');
const chromePayload = toolInvoke('prepare.js');

log('Building types for MV3+...');
const indexTypesContent = toolInvoke('render-tsd.js', { input: chromePayload });
const indexTypesFile = path.join(distDir, 'index.d.ts');
fs.writeFileSync(indexTypesFile, indexTypesContent);
typescriptCheck(indexTypesFile);

log('Building types for all...');
const allTypesContent = toolInvoke('render-tsd.js', { input: chromePayload, args: ['-a'] });
const allTypesFile = path.join(distDir, '_all.d.ts');
fs.writeFileSync(allTypesFile, allTypesContent);
typescriptCheck(allTypesFile);

log('Done!');
