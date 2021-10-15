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
 * @fileoverview Contains fixes and overrides for rendering Chrome types data.
 */


import * as chromeTypes from '../types/chrome.js';
import * as overrideTypes from '../types/override.js';
import { mostReleasedChannel } from './lib/channel.js';
import { buildNamespaceAwareMarkdownRewrite } from './lib/comment.js';
import { FeatureQuery } from './lib/feature-query.js';
import { namespaceNameFromId, parentId } from './lib/traverse.js';


export class FeatureQueryAll extends FeatureQuery {

  /**
   * @param {chromeTypes.FeatureSpec[]} q
   * @return {chromeTypes.FeatureSpec | null | void}
   */
  mergeComplexFeature(q) {
    const s = super.mergeComplexFeature(q);
    if (s !== undefined) {
      return s;
    }

    // Filter (potentially) by channel. Choose the most released channel (e.g., 'stable' over 'beta').
    const bestChannel = q.reduce((channel, spec) => mostReleasedChannel(channel, spec.channel), /** @type {chromeTypes.Channel | undefined} */(undefined));
    const bestChannelFilter = q.filter(({ channel }) => channel === bestChannel);
    if (bestChannelFilter.length === 1) {
      return bestChannelFilter[0];
    }

    // Filter by extension (prefer).
    const extensionFilter = q.filter(({ extension_types }) => extension_types?.includes('extension'));
    if (extensionFilter.length === 1) {
      return extensionFilter[0];
    }
  }
}


/**
 * @implements {overrideTypes.RenderOverride}
 */
export class RenderOverride {
  #commentRewriter;
  #fq;
  #api;

  /**
   * @param {{[name: string]: chromeTypes.NamespaceSpec}} api
   * @param {FeatureQuery} fq
   */
  constructor(api, fq) {
    const allNamespaceNames = Object.keys(api);
    this.#commentRewriter = buildNamespaceAwareMarkdownRewrite(allNamespaceNames);
    this.#fq = fq;
    this.#api = api;
  }

  /**
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   */
  isVisible(spec, id) {
    // Hide a number of internal APIs that aren't specifically disallowed in the feature files.
    const parts = id.split('.');
    if (['api:test', 'api:idltest'].includes(parts[0])) {
      return false;
    }
    const invalid = parts.some((part) => {
      return part.endsWith('Private') || part.endsWith('Internal');
    })
    if (invalid) {
      return false;
    }

    // If this is just a disallowed feature (e.g., it has a specific allowlist) then skip it.
    if (!this.#fq.isAvailable(id)) {
      return false;
    }

    switch (id) {
      case 'api:contextMenus.OnClickData':
      case 'api:notifications.NotificationBitmap':
        // In old versions of Chrome, this is incorrectly marked nodoc.
        return true;

      case 'api:declarativeContent.ShowAction':
        // This is incorrectly referenced even though it's marked nodoc.
        return true;
    }
    return !spec.nodoc;
  }

  /**
   * @param {string} id
   */
  objectTemplatesFor(id) {
    switch (id) {
      case 'api:events.Event':
        return 'H, C = void, A = void';

      case 'api:events.Rule':
        return 'C = any, A = any';

      case 'api:contentSettings.ContentSetting':
        return 'T';

      case 'api:types.ChromeSetting':
        return 'T';
    }
  }

  /**
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   */
  typeOverride(spec, id) {

    // Fix contextMenus not having the right OnClickData type, and it only being present in the
    // "contextMenusInternal" namespace.
    if (id === 'api:contextMenus') {
      const namespace = /** @type {chromeTypes.NamespaceSpec} */ (spec);
      const existing = namespace.types?.find(({ id }) => id === 'OnClickData');
      if (existing) {
        return;
      }
      return {
        ...namespace,
        types: [
          ...namespace.types ?? [],
          ...this.#api['contextMenusInternal'].types ?? [],
        ],
      };
    }

    // Fix contextMenus.onClicked incorrectly $ref-ing another function.
    if (id === 'api:contextMenus.onClicked') {
      if (!spec.$ref) {
        return;
      }
      const { $ref: _$ref, ...clone } = spec;
      clone.parameters = [
        { $ref: 'OnClickData', name: 'info' },
        { $ref: 'tabs.Tab', name: 'tab' },
      ];
      return clone;
    }

    // Replace callback types to do with Event.
    switch (id) {
      case 'api:events.Event.addListener.callback':
      case 'api:events.Event.removeListener.callback':
      case 'api:events.Event.hasListener.callback':
        return { $ref: 'H' };

      case 'api:events.Event.addRules.rules[]':
      case 'api:events.Event.addRules.callback.rules[]':
      case 'api:events.Event.getRules.callback.rules[]':
        return { $ref: 'Rule', value: ['', { $ref: 'C' }, { $ref: 'A' }] };
    }

    // Fix bad runtime.Port APIs in older Chrome versions.
    if (spec.$ref === 'events.Event' && !spec.value) {
      /** @type {chromeTypes.TypeSpec[]} */
      const parameters = [];

      /** @type {chromeTypes.TypeSpec} */
      const functionType = { type: 'function', parameters };

      /** @type {chromeTypes.TypeSpec} */
      const update = { ...spec, value: ['', functionType] };

      switch (id) {
        case 'api:runtime.Port.onMessage':
          parameters.push({ type: 'any', name: 'message' });
        // fall-through

        case 'api:runtime.Port.onDisconnect':
          parameters.push({ $ref: 'Port', name: 'port' });
          break;
      }

      return update;
    }

    // Fix bad contextMenusInternal references in older Chrome versions.
    if (spec.$ref && spec.$ref.startsWith('contextMenusInternal.') && !id.startsWith('api:contextMenusInternal.')) {
      spec.$ref = spec.$ref.replace(/^contextMenusInternal\./, 'contextMenus.');
    }

    // Fix isInstanceOf usages.
    switch (spec.isInstanceOf) {
      case 'Promise':
        return { $ref: 'Promise', value: ['', { type: 'any' }] };

      case 'global':
        return { $ref: 'Window' };
    }

    // Upgrade ambiguous "any" to better template types as needed.
    if (spec.type === 'any') {
      switch (id) {
        case 'api:events.Rule.conditions[]':
          return { $ref: 'C' };

        case 'api:events.Rule.actions[]':
          return { $ref: 'A' };

        case 'api:contentSettings.ContentSetting.get.return.setting':
        case 'api:contentSettings.ContentSetting.get.callback.details.setting':
        case 'api:types.ChromeSetting.set.details.setting':
          return { $ref: 'T' };

        case 'api:types.ChromeSetting.onChange.details.value':
        case 'api:types.ChromeSetting.get.return.value':
        case 'api:types.ChromeSetting.get.callback.details.value':
        case 'api:types.ChromeSetting.set.details.value':
          return { $ref: 'T' };
      }
    }
  }

  /**
   * Generates all extra tags for this node, which may be filtered if they match the tags of our
   * parent. These may include duplicate tags.
   *
   * @param {string} id
   */
  completeTagsFor(id) {
    /** @type {{name: string, value?: string, keep?: true}[]} */
    const tags = [];

    /** @type {chromeTypes.Channel | undefined} */
    let bestChannel = undefined;

    /** @type {boolean} */
    let disallowForServiceWorkers = false;

    /** @type {number} */
    let maxManifestVersion = Infinity;

    /** @type {number} */
    let minManifestVersion = 0;

    /** @type {Set<chromeTypes.Platform>} */
    const platforms = new Set();

    /** @type {boolean} */
    let isOnlyPlatformApps = false;

    // Actually loop over all features.
    // Note that this generates an OR: e.g., accessibilityFeatures requires _either_
    // "permission:accessibilityFeatures.read" OR "permission:accessibilityFeatures.write", and we
    // just include both semi-ambiguously (the site never says OR or AND).
    this.#fq.checkFeature(id, (f, otherId) => {
      if (otherId.startsWith('permission:')) {
        const value = otherId.substr('permission:'.length);
        tags.push({ name: 'chrome-permission', value });
      }

      if (otherId.startsWith('manifest:')) {
        const value = otherId.substr('manifest:'.length);
        tags.push({ name: 'chrome-manifest', value });
      }

      bestChannel = mostReleasedChannel(bestChannel, f.channel);
      disallowForServiceWorkers = disallowForServiceWorkers || (f.disallow_for_service_workers ?? false);

      // nb. In practice we see only min or max. (min for MV3+, max for MV2)
      // TODO: If there is later a MV4, this will need to be updated.
      maxManifestVersion = Math.min(f.max_manifest_version ?? Infinity, maxManifestVersion);
      minManifestVersion = Math.max(f.min_manifest_version ?? 0, minManifestVersion);

      (f.platforms ?? []).forEach((platform) => platforms.add(platform));

      if (f.extension_types && !f.extension_types.includes('extension') && f.extension_types.includes('platform_app')) {
        isOnlyPlatformApps = true;
      }
    });

    bestChannel = bestChannel ?? 'stable';
    if (bestChannel === 'stable') {
      // Ignore, implied
    } else if (bestChannel === 'beta') {
      tags.push({ name: 'chrome-channel', value: 'beta' });
      tags.unshift({ name: 'beta' });
    } else {
      tags.push({ name: 'chrome-channel', value: bestChannel });
      tags.unshift({ name: 'alpha' });
    }

    if (isOnlyPlatformApps) {
      tags.push({ name: 'chrome-platform-apps' });
    }

    if (disallowForServiceWorkers) {
      tags.push({ name: 'chrome-disallow-service-workers' });
    }

    if (maxManifestVersion !== Infinity) {
      const value = `MV${maxManifestVersion}`;
      tags.push({ name: 'chrome-max-manifest', value });
    }
    if (minManifestVersion !== 0) {
      const value = `MV${minManifestVersion}`;
      tags.push({ name: 'chrome-min-manifest', value });
    }

    // This can surface a few values but we generally only end up showing "chromeos".
    platforms.forEach((value) => {
      tags.push({ name: 'chrome-platform', value });
    });

    // Ensure we only return unique tags.
    /** @type {Set<string>} */
    const uniqueSet = new Set();
    return tags.filter((tag) => {
      const key = `${tag.name}/${tag.value ?? ''}/${tag.keep ?? 'false'}`;
      if (uniqueSet.has(key)) {
        return false;
      }
      uniqueSet.add(key);
      return true;
    });
  }

  /**
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   */
  tagsFor(spec, id) {
    let tags = this.completeTagsFor(id);

    const parent = parentId(id);
    if (parent) {
      const parentTags = this.completeTagsFor(parent);
      tags = tags.filter((tag) => {
        if (tag.keep) {
          return true;  // don't filter this one
        }
        // Look for an exact matching parent tag. If we find one, don't include this here.
        return !parentTags.find((parentTag) => {
          return tag.name === parentTag.name && tag.value === parentTag.value;
        });
      });
    }

    return tags;
  }

  /**
   * @param {string} s
   * @param {string} id
   */
  rewriteComment(s, id) {
    const namespace = namespaceNameFromId(id);
    const update = this.#commentRewriter(namespace, s);
    if (update !== s) {
      return update;
    }
  }
}