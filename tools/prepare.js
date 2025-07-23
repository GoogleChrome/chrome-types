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


/**
 * @fileoverview Prepares a bundle representing Chrome's extensions APIs at a specific release.
 * By default this operates on the version at head, but can be invoked with a release number.
 */


import { chromeVersions } from './lib/chrome-versions.js';
import { fetchAllTo } from './lib/chrome-source.js';
import chalk from 'chalk';
import log from 'fancy-log';
import fastGlob from 'fast-glob';
import { convertFromIdl } from './lib/idl-convert.js';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { Semaphore } from './lib/semaphore.js';
import * as os from 'os';
import JSON5 from 'json5'
import * as tmp from 'tmp';
import mri from 'mri';
import * as chromeTypes from '../types/chrome.js';


/**
 * Parse and find IDL and JSON files in these paths.
 */
const definitionPaths = [
  'extensions/common/api',
  'chrome/common/extensions/api',
  'chrome/common/apps/platform_apps/api',
];


/**
 * Fetch these folders to run the IDL => JSON converter.
 */
const toolsPaths = [
  'tools/json_schema_compiler',
  'tools/json_comment_eater',
  'third_party/ply',
];


/**
 * @param {{
 *   majorChrome: number | undefined,
 *   workPath: string,
 *   headRevision: string,
 *   definitionsRevision: string,
 *   cpuLimit: number,
 * }} opts
 */
async function prepareInTemp({ majorChrome, workPath, headRevision, definitionsRevision, cpuLimit }) {
  // In Chrome 121, IDL files were changed to use promises for methods by
  // default. This means running newer versions of the tool on older IDL files
  // will generate the wrong output. We therefore instead use a known-good
  // version of the tool on any IDL files from before Chrome 121.
  const useOldToolRevision = typeof majorChrome === "number" && majorChrome < 121;

  const toolRevision = useOldToolRevision
    // Last commit before the breaking change in Chrome 121.
    ? "c279767649d882b71a14697fe9935d3c890a1ec7"
    : headRevision;

  const defitionsPromise = fetchAllTo(workPath, definitionPaths, definitionsRevision);
  const toolsPromise = fetchAllTo(
    workPath,
    // In newer versions of the tool, generators is vendored into the `json_schema_compiler` directory.
    useOldToolRevision ? [...toolsPaths, 'ppapi/generators'] : toolsPaths,
    toolRevision
  );
  const definitionsFiles = (await defitionsPromise).flatMap(cand => cand ?? []);
  const toolsFiles = (await toolsPromise).flatMap(cand => cand ?? []);

  log.warn(`Fetched ${chalk.blue(definitionsFiles.length)} definitions files (IDL/JSON)`);
  log.warn(`Fetched ${chalk.blue(toolsFiles.length)} tools files to convert IDL => JSON`);

  const allDefinitions = fastGlob.sync('**/*.{json,idl}', { cwd: workPath }).filter(cand => {
    if (cand.includes('/test/') || cand.includes('/test_') || cand.startsWith('tools/')) {
      return false;
    }
    // Only allow JSON/IDL files inside definition paths.
    return definitionsFiles.includes(cand);
  });

  /** @type {{[api: string]: Object}} */
  const outputDefinitions = {};

  // Convert IDL files to JSON, and JSON5 to JSON, in parallel based on how many CPUs we have.
  const conversionLimit = new Semaphore(cpuLimit);
  const conversionTasks = allDefinitions.map(async cand => {
    const {name, ext} = path.parse(cand);

    // Skip, this is probably hidden or a feature file.
    if (name.startsWith('_')) {
      return;
    }

    /** @type {Object} */
    let o;

    if (ext === '.idl') {
      await conversionLimit.acquire();
      try {
        let cache;
        ({o, cache} = await convertFromIdl(workPath, cand));
        if (cache) {
          log.warn(`Read cached conversion ${chalk.green(cand)}`);
        } else {
          log.warn(`Converted ${chalk.green(cand)}`);
        }
      } finally {
        conversionLimit.release();
      }
    } else {
      o = JSON5.parse(await fsPromises.readFile(path.join(workPath, cand), 'utf-8'));
    }

    // Raw JSON definitions come wrapped in an array.
    if (Array.isArray(o)) {
      if (o.length !== 1) {
        throw new Error(`got unexpected API definition length: ${o.length} from ${cand}`);
      }
      o = o[0];
    }

    const namespace = o['namespace'];
    if (!namespace || namespace in outputDefinitions) {
      throw new Error(`got invalid/duplicate namespace: '${namespace}' from ${cand}`);
    }
    outputDefinitions[namespace] = o;
  });
  await Promise.all(conversionTasks);

  // Merge all feature files into one master feature file. Each source file contains unique entries.
  /** @type {{[feature: string]: Object|Array}} */
  const mergedFeatures = {};
  const featureFiles = allDefinitions.filter(cand => {
    const basename = path.basename(cand);
    return basename.startsWith('_') && basename.endsWith('_features.json');
  });
  for (const featureFile of featureFiles) {
    const basename = path.basename(featureFile);
    const type = basename.substring(1, basename.length - '_features.json'.length);

    /** @type {{[feature: string]: Object|Array}} */
    const raw = JSON5.parse(await fsPromises.readFile(path.join(workPath, featureFile), 'utf-8'));

    for (const feature in raw) {
      const id = `${type}:${feature}`;
      if (id in mergedFeatures) {
        throw new Error(`got duplicate feature: ${id}`);
      }
      mergedFeatures[id] = raw[feature];
    }
  }

  log.warn(`Found ${chalk.blue(Object.keys(outputDefinitions).length)} API definitions`);
  log.warn(`Found ${chalk.blue(Object.keys(mergedFeatures).length)} feature definitions`);

  return { feature: mergedFeatures, api: outputDefinitions };
}

async function prepare() {
  const argv = mri(process.argv.slice(2), {
    boolean: ['help', 'debug', 'fast'],
    alias: {
      'help': ['h'],
      'debug': ['d'],
      'fast': ['f'],
    },
    unknown: (v) => {
      throw new Error(`unexpected flag: ${v}`);
    },
  });

  if (argv.help || argv._.length > 1) {
    console.warn(`Usage: prepare.js <chrome-version> > apis.json

Prepares a payload containing all Chrome Extension APIs and their feature files
at a specific major Chrome version. Leave blank for head. Renders a giant JSON
file to STDOUT.

Options:
  -d, --debug          generate formatted JSON
  -f, --fast           convert IDLs as fast as possible (no CPU limit)
`);
    process.exit(0);
  }
  const hasChromeVersion = argv._.length === 1;
  /** @type {{ revision: string, version: string }?} */
  let versionData = null;

  const versions = await chromeVersions();
  const headRevision = versions.head;

  const majorChrome = hasChromeVersion ? Math.ceil(+argv._[0]) : undefined;

  /** @type {string} */
  let definitionsRevision;
  if (typeof majorChrome === "number") {
    versionData = versions.releases.get(majorChrome) ?? null;
    if (!versionData) {
      throw new Error(`unknown Chrome version: ${argv._[0]}`);
    }
    definitionsRevision = versionData.revision;
    log.warn(`Found Chrome ${chalk.red(majorChrome)} at ${chalk.green(definitionsRevision)}`);
  } else {
    definitionsRevision = headRevision;
  }
  log.warn(`main at ${chalk.green(headRevision)}`);

  const tmpobj = tmp.dirSync();
  const workPath = tmpobj.name;

  // Use twice as many CPUs as we have, since there's lots of non-blocking setup/teardown work.
  // Or just go as fast as possible with -f.
  const cpuLimit = argv.fast ? 1_000 : Math.max(os.cpus().length, 1);
  if (!argv.fast) {
    log.warn(`Using ${chalk.red(cpuLimit)} tasks to do conversion`);
  }

  /** @type {{feature: Object, api: Object}} */
  let out;
  try {
    out = await prepareInTemp({
      majorChrome,
      headRevision,
      definitionsRevision,
      workPath,
      cpuLimit,
    });
  } finally {
    await fsPromises.rm(workPath, {recursive: true, force: true});
  }

  /** @type {chromeTypes.ProcessedAPIData} */
  const payload = {
    headRevision,
    definitionsRevision,
    version: versionData,
    when: (new Date().toString()),
    ...out,
  };
  const render = Buffer.from(argv.debug ? JSON.stringify(payload, undefined, 2) : JSON.stringify(payload));
  log.warn(`Generated ${chalk.blue(render.length)} bytes of JSON`);
  process.stdout.write(render);
}


await prepare();
