/**
 * Copyright 2020 Google LLC
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


import {fetchAllTo} from './chrome-work.js';
import {cache, networkFetcher} from '../lib/cache.js';
import * as fs from 'fs';
import * as path from 'path';
import {exec} from '../lib/runners.js';
import {insertTagsAtNamespace} from '../lib/typedoc-helper.js';
import {loadFeatures} from '../lib/features.js';
import * as color from 'colorette';
import * as featureTypes from '../../../types/feature.js';
import {generateAll} from '../lib/tsdoc-generator.js';
import {chromeHeadBranch} from './git.js';


const definitionPaths = [
  'extensions/common/api',
  'chrome/common/extensions/api',
  'chrome/common/apps/platform_apps/api',
];

const toolsPaths = [
  'tools/json_schema_compiler',
  'tools/json_comment_eater',
  'ppapi/generators',
  'third_party/ply',
];

const patchesToApply = [
  // This is the patch out to create TSDoc types.
  'https://chromium-review.googlesource.com/changes/chromium%2Fsrc~2544287/revisions/16/patch?download',
];


/**
 * Skip helper for namespaces.
 *
 * @param {string} namespace
 * @return {boolean} skip if true
 */
function skipNamespace(namespace) {
  return namespace.endsWith('Private') || namespace.endsWith('Internal') || namespace === 'idltest';
}


/**
 * Run the types generation process.
 *
 * @param {string} target temporary folder to use (will be cleared before start)
 * @param {string} revision to fetch APIs at
 * @param {(v: string) => void} log helper
 * @return {Promise<{[filename: string]: string}>}
 */
export default async function build(target, revision, log = () => {}) {
  try {
    fs.rmSync(target, {recursive: true});
  } catch (e) {
    // ignore if missing
  }

  await fetchAllTo(target, toolsPaths, chromeHeadBranch, log);
  await fetchAllTo(target, definitionPaths, revision, log);

  // Apply patches to tools.
  for (const patchUrl of patchesToApply) {
    const buffer = await cache(patchUrl, networkFetcher(patchUrl, (buffer) => {
      return Buffer.from(buffer.toString('utf-8'), 'base64');
    }));
    const output = buffer.toString('utf-8');

    const args = ['patch', '-s', '-p1'];
    await exec(args, target, output);
    log(`Patched with ${color.green(patchUrl)}`);
  }

  // Find all features files and combine them.
  const features = loadFeatures(definitionPaths.map((p) => path.join(target, p)));

  // Load all TSDoc sources.
  const sources = await generateAll(target, definitionPaths);
  const unseenNamespaces = new Set(sources.map(({namespaceName}) => namespaceName));
  log(`Parsed potential ${color.blue('' + unseenNamespaces.size)} namespaces`)

  /**
   * @param {typeof sources[0]} arg
   * @param {featureTypes.ExtensionType} extensionType
   * @return {string=}
   */
  const expand = ({namespaceName, source}, extensionType) => {
    if (skipNamespace(namespaceName)) {
      return;
    }
    const logParts = [color.green(namespaceName)];

    let config = features.expand(`api:${namespaceName}`, extensionType);
    if (!config) {
      // FIXME(samthor): 'usb' is not marked as an extension API but is in fact used by
      // 'printerProviders' purely as a type.
      // 'tabs' and 'window' are not marked as an Apps API but are used by various types.
      const alwaysAllow = (
        extensionType === 'extension' && ['usb'].includes(namespaceName) ||
        extensionType === 'platform_app' && ['tabs', 'windows'].includes(namespaceName)
      );
      if (!alwaysAllow) {
        return;
      }
      config = features.expand(`api:${namespaceName}`);
      if (!config) {
        throw new Error(`could not match alwaysAllow namespace: ${namespaceName}`);
      }
      logParts.push('*');
    }

    unseenNamespaces.delete(namespaceName);

    const tags = [];
    if (config.channel !== 'stable') {
      if (config.channel === 'beta') {
        tags.push('@beta');
      } else if (config.channel === 'dev') {
        tags.push('@alpha');
      }
      logParts.push(color.magenta(config.channel))
    }
    config.platforms.forEach((platform) => tags.push(`@chrome-platform ${platform}`));
    config.permissions.forEach((permission) => tags.push(`@chrome-permission ${permission}`));

    log('  - ' + logParts.join(' '));
    return insertTagsAtNamespace(source, tags) + '\n';
  };

  /**
   * @param {featureTypes.ExtensionType} extensionType
   * @return {string}
   */
  const expandAll = (extensionType) => {
    log(`Generating namespaces for ${color.yellow(extensionType)}:`);
    return sources.map((arg) => {
      return expand(arg, extensionType) ?? '';
    }).join('');
  };

  /** @type {{[filename: string]: string}} */
  const out = {};
  out['index.d.ts'] = expandAll('extension');
  out['platform_app.d.ts'] = expandAll('platform_app');

  log(`Skipped ${color.blue('' + unseenNamespaces.size)} namespaces:`);
  for (const namespaceName of unseenNamespaces) {
    log('  - ' + color.green(namespaceName));
  }

  return out;
}
