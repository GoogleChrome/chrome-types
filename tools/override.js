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
import { leastReleasedChannel, mostReleasedChannel } from './lib/channel.js';
import { buildNamespaceAwareMarkdownRewrite } from './lib/comment.js';
import { FeatureQuery } from './lib/feature-query.js';
import { namespaceNameFromId, parentId } from './lib/traverse.js';
import { isDeepEqual } from './lib/equal.js';

/**
 * Empty implementation of {@link overrideTypes.RenderOverride}. For tests.
 * 
 * @implements {overrideTypes.RenderOverride}
 */
export class EmptyRenderOverride {

  isVisible(spec, id) {
    return true;
  }

  isPromiseSupportVisible(spec, id) {
    return true;
  }

  isPlatformAppsOnly(id) {
    return false;
  }

  /**
   * @return {string | undefined}
   */
  objectTemplatesFor(id) {
    return undefined;
  }

  /**
   * @return {chromeTypes.TypeSpec | undefined}
   */
  typeOverride(spec, id) {
    return undefined;
  }

  /**
   * @return {chromeTypes.Tag[] | undefined}
   */
  tagsFor(spec, id) {
    return undefined;
  }

  /**
   * @return {string | undefined}
   */
  rewriteComment(s, id, tagName) {
    return undefined;
  }

}


export class RenderOverride extends EmptyRenderOverride {
  #commentRewriter;
  #fq;
  #api;
  #history;
  #majorVersion;

  /**
   * @param {{[name: string]: chromeTypes.NamespaceSpec}} api
   * @param {FeatureQuery} fq
   * @param {chromeTypes.HistoricSymbolsPayload?} history
   * @param {number?} majorVersion
   */
  constructor(api, fq, history = null, majorVersion = null) {
    super();
    const allNamespaceNames = Object.keys(api);
    this.#commentRewriter = buildNamespaceAwareMarkdownRewrite(allNamespaceNames);
    this.#fq = fq;
    this.#api = api;
    this.#history = history;
    this.#majorVersion = majorVersion;
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
      case 'api:extensionTypes.ExecutionWorld':
      case 'api:contentScripts.ContentScript.world':
        return !this.#majorVersion || this.#majorVersion >= 111;
      case 'api:action.openPopup':
        return !this.#majorVersion || this.#majorVersion >= 127;
      case 'api:contextMenus.OnClickData':
      case 'api:notifications.NotificationBitmap':
      case 'api:sidePanel.getPanelBehavior':
      case 'api:sidePanel.setPanelBehavior':
      case 'api:declarativeNetRequest.getDisabledRuleIds':
      case 'api:declarativeNetRequest.updateStaticRules':
      case 'api:declarativeNetRequest.MAX_NUMBER_OF_DYNAMIC_RULES':
      case 'api:declarativeNetRequest.MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES':
      case 'api:declarativeNetRequest.MAX_NUMBER_OF_SESSION_RULES':
      case 'api:declarativeNetRequest.MAX_NUMBER_OF_UNSAFE_SESSION_RULES':
      case 'api:runtime.onUserScriptConnect':
      case 'api:runtime.onUserScriptMessage':
        // In old versions of Chrome, this is incorrectly marked nodoc.
        return true;
      case 'api:iconVariants':
      case 'api:experimentalAiData':
        // This is not marked as nodoc, but this is a non-shipping feature so
        // doesn't make sense in our docs.
        return false;
    }
    return !spec.nodoc;
  }

  /**
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   */
  isPromiseSupportVisible(spec, id) {
    switch (id) {
      case 'api:storage.StorageArea.get':
      case 'api:storage.StorageArea.set':
      case 'api:storage.StorageArea.remove':
      case 'api:storage.StorageArea.clear':
      case 'api:storage.StorageArea.getBytesInUse':
        // We added and then reverted a commit to land promise support in 88.
        // The commit which eventually shipped to land this was in Chrome 95.
        return !this.#majorVersion || this.#majorVersion >= 95;
      default:
        return true;
    }
  }

  /**
   * @param {string} id
   */
  isPlatformAppsOnly(id) {
    return this.#fq.checkFeature(id, (f) => f.extension_types?.length === 1 && f.extension_types[0] === "platform_apps");
  }

  /**
   * @param {string} id
   */
  objectTemplatesFor(id) {
    switch (id) {
      case 'api:events.Event':
        return 'H extends (...args: any) => void, C = void, A = void';

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
  rewriteEventsToProperties(spec, id) {
    if (!spec.events?.length) {
      return undefined;
    }

    /** @type {{[name: string]: chromeTypes.TypeSpec}} */
    const eventsAsProperties = {};

    for (const event of spec.events) {
      const { returns, parameters, type, options, extraParameters, filters, ...outer } = event;

      // This is a declarative event listener. It does not take a callback.
      if (options?.supportsListeners === false) {
        if (!options.conditions?.length || !options.actions?.length) {
          throw new Error(`invalid declarative event: ${JSON.stringify(event)}`);
        }

        // Look for the left part, e.g. "api:declarativeContent.onPageChanged" =>
        // "declarativeContent". The strings we get from Chrome's source code start with this, even
        // though it's redundant.
        const namespaceName = namespaceNameFromId(id);
        if (!namespaceName) {
          throw new Error(`could not find left part: ${id}`);
        }
        /** @type {(s: string[]) => chromeTypes.TypeSpec[]} */
        const toRef = (s) => {
          return s.map((raw) => {
            if (raw.startsWith(namespaceName + '.')) {
              raw = raw.substr(namespaceName.length + 1);
            }
            return { $ref: raw };
          });
        };

        // The template args are like "functionType", "conditions", "actions", so mark the function
        // as "never" so addListener etc cannot be used here.
        eventsAsProperties[event.name] = {
          $ref: 'events.Event',
          value: [
            event.name,
            { type: 'never' },
            { choices: toRef(options.conditions) },
            { choices: toRef(options.actions) },
          ],
        };
        continue;
      }

      // Set up the basic callback type. This is the same regardless of extraParameters or filters.
      /** @type {chromeTypes.TypeSpec} */
      const callbackType = {
        type: 'function',
      };
      if (event.$ref) {
        // This is a function which references another function. It only happens once and is
        // invalid, so we rewrite it in typeOverride below.
        callbackType.$ref = event.$ref;
      }
      if (returns) {
        callbackType.returns = returns;
      }
      if (parameters) {
        callbackType.parameters = parameters;
      }

      // There are two ways that Chrome's events can actually modify the simple `addListener`
      // function.
      //   - If they define `filters`, this is taken as an extra dictionary argument.
      //   - If they define `extraParameters`, these are appended to `addListener`.
      // (As of Oct 2021, no events have both, but we just append them in order if seen.)
      //
      // If we see any values in this array, we construct a special override type which accepts
      // additional parameters on `addListener`, but not on the other methods (e.g., `hasListener`
      // or `removeListener` work the same).
      /** @type {chromeTypes.TypeSpec[]} */
      const addListenerExtraParameters = [];

      // Check for filters and add them.
      if (filters?.length) {
        // Confusingly, filters is an array, but is accepted as a dictionary (like properties).

        /** @type {chromeTypes.TypeSpec} */
        const filterParam = {
          name: 'filters',
          type: 'object',
          properties: Object.fromEntries(filters.map((filter) => {
            return [filter.name, filter];
          })),
          optional: true,
        };
        addListenerExtraParameters.push(filterParam);
      }

      // This is a special type of event that's found in `webRequest`. It actually allows additional
      // parameters in the addListner call. We have to create a new virtual type for it.
      // It tends to have filter-like things in the source, but `webRequest` predates filters.
      if (extraParameters?.length) {
        addListenerExtraParameters.push(...extraParameters);
      }

      // If we have extra parameters, then we actually inherit from `CustomChromeEvent` passing
      // the custom addListener function as an inline type.
      if (addListenerExtraParameters.length) {

        // TODO(samthor): Should we make all events like this, for consistency?

        /** @type {chromeTypes.TypeSpec} */
        const addListenerFunction = {
          type: 'function',
          parameters: [
            { name: 'callback', ...callbackType },
            ...addListenerExtraParameters,
          ],
        };

        // This $ref matches the magic type in `preamble.d.ts`.
        eventsAsProperties[event.name] = {
          ...outer,
          $ref: 'CustomChromeEvent',
          value: ['', addListenerFunction],
          _event: true,
        };
        continue;
      }

      // Otherwise this is a normal event that references 'event.Event'.
      eventsAsProperties[event.name] = {
        ...outer,
        $ref: 'events.Event',
        value: [event.name, callbackType],
        _event: true,
      };
    }

    // Remove events as they've been converted to props.
    return {
      ...spec,
      events: undefined,
      properties: { ...spec.properties, ...eventsAsProperties },
      _event: true,
    };
  }

  /**
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   * @return {chromeTypes.TypeSpec|chromeTypes.NamespaceSpec|undefined}
   */
  typeOverride(spec, id) {

    // Move values found in 'events' to properties, as they are really just instances of `event.Event`.
    const maybeRewriteSpec = this.rewriteEventsToProperties(spec, id);
    if (maybeRewriteSpec) {
      // If this changed the spec, call us again, without the events list.
      return this.typeOverride(maybeRewriteSpec, id) ?? maybeRewriteSpec;
    }

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
      if (!Array.isArray(spec.value) || !spec.value[1]?.$ref) {
        return;
      }
      const { ...clone } = spec;
      clone.value = [...spec.value];
      clone.value[1] = {
        type: 'function',
        parameters: [
          { $ref: 'OnClickData', name: 'info' },
          { $ref: 'tabs.Tab', name: 'tab' },
        ],
      }
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
   * @param {string} id
   * @return {chromeTypes.Channel}
   */
  bestChannelFor(id) {
    /** @type {chromeTypes.Channel | undefined} */
    let bestChannel = undefined;

    this.#fq.checkFeature(id, (f, otherId) => {
      bestChannel = leastReleasedChannel(bestChannel, f.channel);
    });

    return bestChannel ?? 'stable';
  }

  /**
   * Generates all extra tags for this node, which may be filtered if they match the tags of our
   * parent. These may include duplicate tags.
   *
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   */
  completeTagsFor(spec, id) {
    /** @type {{name: string, value?: string, keep?: true}[]} */
    const tags = [];

    // Push a special "@event" which is just used by TypeDoc to group us.
    if (spec._event) {
      tags.push({name: 'event'});
    }

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

    /** @type {boolean} */
    let requiresPolicyInstall = false;

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

      disallowForServiceWorkers = disallowForServiceWorkers || (f.disallow_for_service_workers ?? false);

      // nb. In practice we see only min or max. (min for MV3+, max for MV2)
      // TODO: If there is later a MV4, this will need to be updated.
      maxManifestVersion = Math.min(f.max_manifest_version ?? Infinity, maxManifestVersion);
      minManifestVersion = Math.max(f.min_manifest_version ?? 0, minManifestVersion);

      (f.platforms ?? []).forEach((platform) => platforms.add(platform));

      if (f.extension_types && !f.extension_types.includes('extension') && f.extension_types.includes('platform_app')) {
        isOnlyPlatformApps = true;
      }

      requiresPolicyInstall = requiresPolicyInstall || (isDeepEqual(f.location, 'policy'));
    });

    const bestChannel = this.bestChannelFor(id);
    if (bestChannel === 'stable') {
      // Ignore, implied
    } else if (bestChannel === 'beta') {
      tags.push({ name: 'chrome-channel', value: 'beta' });
      tags.unshift({ name: 'beta' });
    } else {
      tags.push({ name: 'chrome-channel', value: bestChannel });
      tags.unshift({ name: 'alpha' });
    }

    if (requiresPolicyInstall) {
      tags.push({ name: 'chrome-install-location', value: 'policy' });
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

    // Find and render history information if available.
    if (bestChannel === 'stable') {
      const sinceText = this.sinceTextFor(spec, id);
      if (sinceText.since) {
        tags.unshift({ name: 'since', value: sinceText.since });
      }
      if (sinceText.deprecatedSince) {
        tags.push({ name: 'chrome-deprecated-since', value: sinceText.deprecatedSince });
      }
    }

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
   * Returns friendly information about what version this is available from, and what version
   * it was deprecated from. Both are optional.
   *
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   * @return {{since?: string, deprecatedSince?: string}}
   */
  sinceTextFor(spec, id) {
    if (!this.#history) {
      return {};
    }

    const self = this.#history.symbols[id];
    if (!self) {
      // This happens if the symbol is brand new but hasn't got history data yet, likely before
      // this Chrome is actually released.
      return { since: 'Pending' };

    } else if (self.high < this.#history.high) {
      // A symbol is present now, has some history (so it isn't new) but wasn't
      // in the last stable release. This means it was temporarily removed and
      // then later added back in a higher version.
      return { since: `Missing ${self.high} vs ${this.#history.high}` };

    }

    const out = {};

    // We hit a known symbol!
    if (spec.deprecated) {
      if (self.deprecated) {
        out.deprecatedSince = `Chrome ${self.deprecated}`;
      } else {
        // We've been marked as @deprecated in the source but it hasn't appeared in a stable
        // release of Chrome yet.
        out.deprecatedSince = 'Pending';
      }
    }

    if (self.low) {
      out.since = `Chrome ${self.low}`;
    }

    return out;
  }

  /**
   * @param {chromeTypes.TypeSpec} spec
   * @param {string} id
   */
  tagsFor(spec, id) {
    let tags = this.completeTagsFor(spec, id);

    // Only remove parent tags if we ourselves are not a namespace and there is a valid parent.
    // This prevents stripping tags from e.g. "api:networking.onc", which has no parent.
    const parent = parentId(id);
    if (parent && !spec['namespace']) {
      const parentTags = this.completeTagsFor(spec, parent);
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