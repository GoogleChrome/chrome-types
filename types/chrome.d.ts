
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

export interface FeatureSpec {

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
 * Note that `void` and `undefined` doesn't appear in source, but it's helpful for our code.
 */
export type PrimitiveType = 'void' | 'undefined' | 'array' | 'any' | 'int64' | 'binary' | 'boolean' | 'integer' | 'double' | 'number' | 'string' | 'object' | 'function';

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
