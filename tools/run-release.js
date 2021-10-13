#!/usr/bin/env node

import run from './lib/spawn-helper.js';
import * as path from 'path';
import * as fs from 'fs';
import log from 'fancy-log';


const { pathname: rootDir } = new URL('../', import.meta.url);
const distDir = path.join(rootDir, 'dist');


/**
 * @param {string} tool
 * @param {{input?: Buffer, args?: string[]}} options
 * @return {Buffer}
 */
function toolInvoke(tool, { input, args } = {}) {
  const p = path.join('tools', tool);
  return run([p, ...args ?? []], { input, cwd: rootDir });
}


/**
 * @param {string} p
 */
function typescriptCheck(p) {
  run(['./node_modules/.bin/tsc', p], { stdoutInherit: true, cwd: rootDir });
}


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
