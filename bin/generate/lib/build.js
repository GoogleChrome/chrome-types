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
import {loadFeatures} from '../lib/features.js';
import * as color from 'colorette';
import * as featureTypes from '../../../types/feature.js';
import {generateAll} from '../lib/tsdoc-generator.js';
import {chromeHeadBranch} from './git.js';
import {rewriteBlockComments} from './comment.js';
import {buildNamespaceAwareRewrite} from './comment-rewrite.js';
import * as tmp from 'tmp';


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
  'https://chromium-review.googlesource.com/changes/chromium%2Fsrc~2544287/revisions/17/patch?download',
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
 * Run the types generation process for a specific revision. This generates types for all matched
 * IDL/JSON files and incorporates the relevant feature JSON files.
 *
 * @param {string} revision to fetch APIs at
 * @param {boolean} debug
 * @param {(v: string) => void} log helper
 * @return {Promise<{[filename: string]: string}>}
 */
export default async function build(revision, debug, log = () => {}) {
  const t = tmp.dirSync();

  try {
    return await internalBuild(t.name, revision, log);
  } finally {
    if (!debug) {
      fs.rmSync(t.name, {recursive: true});
    } else {
      console.warn('generated temp dir', t.name);
    }
  }
}


/**
 * @param {string} target temporary folder to work from
 * @param {string} revision to fetch APIs at
 * @param {(v: string) => void} log helper
 * @return {Promise<{[filename: string]: string}>}
 */
async function internalBuild(target, revision, log = () => {}) {
  try {
    fs.rmSync(target, {recursive: true});
  } catch (e) {
    // ignore if missing
  }

  // Prepare parts of the preamble appended to all generated files.
  const now = new Date();
  const {pathname: preambleTypesPath} = new URL('../preamble.d.ts', import.meta.url);
  const preambleTypes = fs.readFileSync(preambleTypesPath, 'utf-8');
  const preambleNotice = `/**
 * Copyright ${now.getFullYear()} Google LLC
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

// Built at ${now}
`;

  await fetchAllTo(target, toolsPaths, chromeHeadBranch, log);
  await fetchAllTo(target, definitionPaths, revision, log);

  // Apply patches to tools.
  for (const patchUrl of patchesToApply) {
    const buffer = await cache(patchUrl, networkFetcher(patchUrl, (buffer) => {
      return Buffer.from(buffer.toString('utf-8'), 'base64');
    }));
    const patchContent = buffer.toString('utf-8');

    const args = ['patch', '-s', '-p1'];
    const {code} = await exec(args, {cwd: target, stdin: patchContent});
    if (code) {
      throw new Error(`failed to patch: ${patchUrl}`);
    }
    log(`Patched with ${color.green(patchUrl)}`);
  }

  // Find all features files and combine them.
  const features = loadFeatures(definitionPaths.map((p) => path.join(target, p)));

  // Load all TSDoc sources.
  const sources = await generateAll(target, definitionPaths);
  const unseenNamespaces = new Set(sources.map(({namespaceName}) => namespaceName));
  const allNamespaceNames = [...unseenNamespaces];
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

    const rewrite = buildNamespaceAwareRewrite(namespaceName, allNamespaceNames);
    source = rewriteBlockComments(source, (comment, tags) => {
      tags.forEach((tag) => {
        if (tag.value) {
          tag.value = rewrite(tag.value);
        }
      });

      // We hit rewrite all comments, but when we find the namespace-annotated tag (generated by
      // the underlying compiler), insert a bunch of extra metadata: platform, permission, channel.
      const namespaceTag = tags.find(({name}) => name === 'chrome-namespace');
      if (namespaceTag) {
        const c = /** @type {featureTypes.FlatFeature} */ (config);

        c.platforms.forEach((platform) => tags.push({name: 'chrome-platform', value: platform}));
        c.permissions.forEach((permission) => tags.push({name: 'chrome-permission', value: permission}));

        if (c.channel !== 'stable') {
          if (c.channel === 'beta') {
            tags.push({name: 'beta'});
          } else if (c.channel === 'dev') {
            tags.push({name: 'alpha'});
          }
          logParts.push(color.magenta(c.channel))
        }

        if (c.minManifestVersion) {
          tags.push({name: 'chrome-manifest-min', value: '' + c.minManifestVersion});
          logParts.push(`>=${color.yellow(`MV${c.minManifestVersion}`)}`);
        }
        if (c.maxManifestVersion) {
          tags.push({name: 'chrome-manifest-max', value: '' + c.maxManifestVersion});
          logParts.push(`<=${color.yellow(`MV${c.maxManifestVersion}`)}`);
        }
      }

      return rewrite(comment);
    });

    log('  - ' + logParts.join(' '));
    return source + '\n';
  };

  /**
   * @param {featureTypes.ExtensionType} extensionType
   * @return {string}
   */
  const expandAll = (extensionType) => {
    log(`Generating namespaces for ${color.yellow(extensionType)}:`);

    const preamble = `${preambleNotice}\n${preambleTypes}\n\n`;

    return preamble + sources.map((arg) => {
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
