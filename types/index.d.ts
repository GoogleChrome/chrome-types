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
 * Prepares information on Chrome extension APIs at the given revision.
 */
export function prepareNamespaces(options?: Partial<MainOptions>): Promise<MainResult>;


import * as model from '../lib/gen/model.js';


export interface MainResult {
  namespaces: {[name: string]: model.Namespace},
  stats: {
    features: number,
    namespaces: number,
    skipped: string[],
  },
};


export interface MainOptions {
  revision: string,
  toolsRevision: string,
  cacheIdlParse: boolean,
  symbols: SymbolsVersionInfo,
};


export type RawTypeType =
    'array' | 'any' | 'int64' | 'binary' | 'boolean' | 'integer' | 'double' | 'number' | 'string' | 'object' | 'function';
export type All = 'all';
export type Channel = 'stable' | 'beta' | 'dev' | 'canary' | 'trunk';
export type Platform = 'chromeos' | 'lacros' | 'linux' | 'mac' | 'win';
export type Context = 'blessed_extension' | 'blessed_web_page' | 'content_script' | 'lock_screen_extension' | 'web_page' | 'webui' | 'webui_untrusted' | 'unblessed_extension';
export type ExtensionType = 'extension' | 'hosted_app' | 'legacy_packaged_app' | 'platform_app' | 'shared_module' | 'theme' | 'login_screen_extension';
export type Location = 'component' | 'external_component' | 'policy' | 'unpacked';
export type SessionType = 'regular' | 'kiosk' | 'kiosk.autolaunched';


// FIXME: This should have at least one value.
export type MinArray<T> = T[];


export type RawFeatureFile = {[name: string]: RawFeature|RawFeature[]};


export interface RawShared {
  description?: string;
  deprecated?: string;
  nodoc?: boolean | "true";
  jsexterns?: string;
  platforms?: string[] | null;

  properties?: {[name: string]: RawType};
  functions?: (RawType & {type: 'function'})[];
  events?: (RawType & {type: 'function'})[];
}


export interface RawNamespace extends RawShared {
  types?: RawType[];
  namespace: string;
}


export interface RawType extends RawShared {
  id?: string;
  name?: string;
  optional?: boolean;

  type?: RawTypeType;

  $ref?: string;
  isInstanceOf?: string;

  value?: number | string | [string, RawType] | {};

  minimum?: number;
  maximum?: number;

  additionalProperties?: RawType;

  serializableFunction?: boolean;
  serialized_type?: string;

  parameters?: RawType[];
  returns?: RawType;
  returns_async?: RawType;

  enum?: (string | {name: string})[];
  choices?: RawType[];

  items?: RawType;
  minItems?: number;
  maxItems?: number;

  /**
   * Options are available on top-level event types.
   */
  options?: {
    unmanaged?: boolean;
    maxListeners?: number;
    supportsFilters?: boolean;
    supportsListeners?: boolean;
    supportsRules?: boolean;
    conditions?: string[];
    actions?: string[];

    supportsDom?: boolean;
    supportsLazyListeners?: boolean;
  };
}


export interface QueryRequest {
  manifestVersion?: number;
  extensionType?: ExtensionType;
}


export interface Tag {
  name: string;
  value?: string | number;
}


export interface VersionInfo {
  channel?: Channel,
  deprecated?: number,
  low?: number,
}

export type SymbolsVersionInfo = {[path: string]: VersionInfo};

export interface VersionDataFile {
  low: number,
  version: number,
  generated: string,
  symbols: SymbolsVersionInfo,
}


/**
 * Describes a simplified feature within our codebase. This should be used as Partial<Feature>.
 */
export interface Feature {
  platformAppsOnly: true;
  chromeOsOnly: true;
  supportedInChannel: Channel;
  minManifestVersion: number;
  maxManifestVersion: number;
  disallowForServiceWorkers: true;
  permissions: string[];

  // These are not set by direct parsing, but by loading historical verison data.
  availableFromVersion: number;
  deprecatedSinceVersion: number;
  unknownVersion: true;
}


/**
 * Describes a simple feature as specified in the Chromium source. (If we are in an array of
 * features, that is a complex feature).
 *
 * Note that this does not include 'alias' and 'source', which together allow for 1:1 mappings
 * between features. This is used once and adds lots of complexity.
 */
export interface RawFeature {

  /**
   * This doesn't really exist, but lets us easily skip this feature later: it's never allowed.
   */
  _skip?: true;

  allowlist?: MinArray<string>;

  blocklist?: MinArray<string>;

  channel?: Channel;

  command_line_switch?: string;

  /**
   * The default here is true, so it can only be set to false.
   */
  component_extensions_auto_granted?: false;

  contexts?: MinArray<Context>|All;

  /**
   * If this is part of a complex feature (many definitions) and that complex feature is being used
   * as a parent, then use this specific definition as the parent.
   */
  default_parent?: true;

  dependencies?: string[];

  disallow_for_service_workers?: boolean;

  extension_types?: MinArray<ExtensionType>|All;

  feature_flag?: string;

  location?: Location;

  internal?: true;

  matches?: MinArray<string>;

  max_manifest_version?: number;

  min_manifest_version?: number;

  noparent?: true;

  platforms?: MinArray<Platform>;

  session_types?: MinArray<SessionType>;
}