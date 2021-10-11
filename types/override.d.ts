
import * as chromeTypes from './chrome.js';


export interface RenderOverride {

  /**
   * Is this type visible and should be rendered / descended into?
   */
  isVisible(spec: chromeTypes.TypeSpec, id: string): boolean;

  /**
   * These are the template overrides for interface definitions within Chrome's extensions codebase.
   *
   * Chrome has no way of specifying that a type might be templated, so this can't upgrade a passed
   * "spec", it has to return a literal string that is placed inside `Foo<str>`.
   */
  objectTemplatesFor(id: string): string | undefined;

  /**
   * Optionally do a complete type replacement or upgrade just prior to render. This occurs after
   * any part of the property rendering (i.e., comment, optional and so on).
   */
  typeOverride(spec: chromeTypes.TypeSpec, id: string): chromeTypes.TypeSpec | undefined;

  /**
   * Finds any additional @-tags for this node.
   */
  tagsFor(spec: chromeTypes.TypeSpec, id: string): { name: string, value?: string }[] | undefined;

  /**
   * Rewrites the passed comment. This could be for a tag param or a top-level comment.
   */
  rewriteComment(s: string, id: string, tagName?: string): string | undefined;

}
