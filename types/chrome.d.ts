
export interface ChromeVersionsData {
  head: string;
  releases: Map<number, { revision: string, version: string }>;
}


export interface ProcessedAPIData {
  headRevision: string;
  definitionsRevision: string;
  version: { revision: string, version: string } | null;
  when: string;
  feature: {
    [feature: string]: FeatureSpec|FeatureSpec[],
  };
  api: {
    [api: string]: NamespaceSpec,
  };
}


// FIXME: This should have at least one value.
export type MinArray<T> = T[];
export type Channel = 'stable' | 'beta' | 'dev' | 'canary' | 'trunk';
export type Platform = 'chromeos' | 'lacros' | 'linux' | 'mac' | 'win';
export type Context = 'blessed_extension' | 'blessed_web_page' | 'content_script' | 'lock_screen_extension' | 'web_page' | 'webui' | 'webui_untrusted' | 'unblessed_extension';
export type ExtensionType = 'extension' | 'hosted_app' | 'legacy_packaged_app' | 'platform_app' | 'shared_module' | 'theme' | 'login_screen_extension';
export type All = 'all';
export type SessionType = 'regular' | 'kiosk' | 'kiosk.autolaunched';


export interface FeatureSpec {
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


export type SpecGroup = {[name: string]: TypeSpec} | TypeSpec[] | undefined;


export interface SharedSpec {
  description?: string;
  deprecated?: string | null;
  nodoc?: boolean | 'true';
  jsexterns?: string | null;
  platforms?: string[] | null;

  properties?: {[name: string]: TypeSpec};
  functions?: (TypeSpec & {type: 'function'})[];
  events?: EventSpec[];
}


/**
 * A primitive type understood by Chrome's extensions.
 *
 * Note that `void`, `undefined` and `never` don't appear in source, but are helpful for our code.
 */
export type PrimitiveType = 'void' | 'undefined' | 'never' | 'array' | 'any' | 'int64' | 'binary' | 'boolean' | 'integer' | 'double' | 'number' | 'string' | 'object' | 'function';


/**
 * This is a raw type as found inside Chrome's JSON extension definitions.
 */
export interface TypeSpec extends SharedSpec {
  id?: string;
  name?: string;
  optional?: boolean;

  type?: PrimitiveType;

  $ref?: string;
  isInstanceOf?: string;

  value?: number | string | [string] | [string, ...TypeSpec[]] | {};

  minimum?: number;
  maximum?: number;

  additionalProperties?: TypeSpec;

  serializableFunction?: boolean;
  serialized_type?: PrimitiveType;

  parameters?: TypeSpec[];
  returns?: TypeSpec;
  returns_async?: TypeSpec;

  enum?: string[] | number[] | { name: string, description?: string }[];
  choices?: TypeSpec[];

  // for type='array'
  items?: TypeSpec;
  minItems?: number;
  maxItems?: number;

  // only for top-level namespace types
  noinline_doc?: boolean | 'True';
}


export interface NamedTypeSpec extends TypeSpec {
  name: string;
}


/**
 * This is the type of instances of the "event" array found directly as part of a namespace or type.
 * Events are effectively functions plus options.
 */
export interface EventSpec extends TypeSpec {
  type?: 'function';

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

/**
 * This is the type of the namespace.
 */
export interface NamespaceSpec extends SharedSpec {
  namespace: string;
  types?: TypeSpec[];

  // largely unused parts of namespace
  manifest_keys?: {[name: string]: TypeSpec} | null;
  documentation_options?: Object;
  compiler_options?: Object;
  internal?: boolean;
}


export type SpecCallback = (spec: TypeSpec, id: string, tags: {name: string, value?: string}[]) => void;


export type Tag = { name: string, value?: string };

