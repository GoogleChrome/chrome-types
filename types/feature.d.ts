
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
