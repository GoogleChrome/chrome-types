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


import * as chromeTypes from './chrome.js';


/**
 * Describes an interface that lets us modify Chrome's extension types prior to rendering.
 */
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
   * Finds any additional @-tags for this node, on top of the standard non-Chrome annotated
   * tags (e.g., @deprecated, @since and so on).
   */
  tagsFor(spec: chromeTypes.TypeSpec, id: string): chromeTypes.Tag[] | undefined;

  /**
   * Rewrites the passed comment. This could be for a tag param or a top-level comment.
   */
  rewriteComment(s: string, id: string, tagName?: string): string | undefined;

}
