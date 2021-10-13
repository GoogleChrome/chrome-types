#!/usr/bin/env node

import * as childProcess from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import log from 'fancy-log';


const { pathname: rootDir } = new URL('../', import.meta.url);
const distDir = path.join(rootDir, 'dist');


/**
 * @param {string[]} parts
 * @param {{input?: Buffer, stdoutInherit?: true}} options
 */
function run(parts, { input, stdoutInherit } = {}) {
  /** @type {childProcess.SpawnSyncOptionsWithBufferEncoding} */
  const options = {
    cwd: rootDir,
    stdio: ['pipe', stdoutInherit ? 'inherit' : 'pipe', 'inherit'],
    maxBuffer: 1024 * 1024 * 16,  // 16mb
    encoding: 'buffer',
  };
  if (input) {
    options.input = input;
  }

  const [command, ...rest] = parts;
  const { stdout, status, error } = childProcess.spawnSync(command, rest, options);
  if (error) {
    throw error;
  }
  if (status) {
    throw new Error(`code: ${status}`);
  }
  return stdout;
}


/**
 * @param {string} tool
 * @param {{input?: Buffer, args?: string[]}} options
 * @return {Buffer}
 */
function runTool(tool, { input, args } = {}) {
  const p = path.join('tools', tool);
  return run([p, ...args ?? []], { input });
}


log('Fetching Chrome payload...');
const chromePayload = runTool('prepare.js');

log('Building types for MV3+...');
const indexTypesContent = runTool('render-tsd.js', { input: chromePayload });
fs.writeFileSync(path.join(distDir, 'index.d.ts'), indexTypesContent);
run(['./node_modules/.bin/tsc', 'dist/index.d.ts'], { stdoutInherit: true });

log('Building types for all...');
const allTypesContent = runTool('render-tsd.js', { input: chromePayload, args: ['-a'] });
fs.writeFileSync(path.join(distDir, '_all.d.ts'), allTypesContent);
run(['./node_modules/.bin/tsc', 'dist/_all.d.ts'], { stdoutInherit: true });

log('Done!');
