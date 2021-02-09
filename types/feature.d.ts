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

export type FeatureFile = {[name: string]: Feature|Feature[]};

export type All = "all";

export type Channel = "stable" | "beta" | "dev" | "canary" | "trunk";

export type Context = "blessed_extension" | "blessed_web_page" | "content_script" | "lock_screen_extension" | "web_page" | "webui" | "webui_untrusted" | "unblessed_extension";

export type ExtensionType = "extension" | "hosted_app" | "legacy_packaged_app" | "platform_app" | "shared_module" | "theme" | "login_screen_extension";

export type Location = "component" | "external_component" | "policy" | "unpacked";

export type Platform = "chromeos" | "lacros" | "linux" | "mac" | "win";

export type SessionType = "regular" | "kiosk" | "kiosk.autolaunched";

type MinArray<T> = T[] & [T];

/**
 * Defines a simple feature. (If we are in an array of features, that is a complex feature).
 *
 * Note that this does not include "alias" and "source", which together allow for 1:1 mappings
 * between features. This is used once and adds lots of complexity.
 */
export interface Feature {
  allowlist?: MinArray<string>;

  blocklist?: MinArray<string>;

  channel?: Channel;

  command_line_switch?: string;

  /**
   * The default here is true, so it can only be set to false.
   */
  component_extensions_auto_granted?: false;

  contexts?: (Context | All)[];

  /**
   * If this is part of a complex feature (many definitions) and that complex feature is being used
   * as a parent, then use this specific definition as the parent.
   */
  default_parent?: true;

  dependencies?: string[];

  disallow_for_service_workers?: boolean;

  extension_types?: MinArray<ExtensionType | All>;

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

export interface IdFeature extends Feature {
  id: string;
}

export interface FlatFeature {
  permissions: string[];
  manifestKeys: string[];
  behaviors: string[];
  channel: Channel;
  commandLineSwitches: string[];
  componentExtensionsAutoGranted: boolean;
  disallowForServiceWorkers: boolean;
  internal: boolean;
  contexts: (Context | All)[],
  extensionTypes: (ExtensionType | All)[];
  platforms: (Platform | All)[];
  sessionTypes: (SessionType | All)[];
}