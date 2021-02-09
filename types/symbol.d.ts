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

import {Channel} from './feature.js';
export {Channel} from './feature.js';

export interface SymbolInfo {

  /**
   * When was this API removed from the platform?
   */
  high?: number;

  /**
   * When was this API first seen/introduced? This can be empty if it's prior to the first valid
   * .d.ts file that can be parsed (around Chrome 35).
   */
  low?: number;

  /**
   * Which release was this symbol deprecated at, if any. This will always be <= the highest API
   * version seen at. Not all APIs are deprecated before removal.
   *
   * This will be negative if deprecated prior to the first parsed version.
   */
  deprecated?: number;

  /**
   * The type of release: stable (or blank), beta or dev.
   *
   * TODO: this resets the other variables when changed
   */
  release?: Channel;
}

export interface RawSymbolInfo {
  deprecated: boolean;
  release: Channel;
}

export type VersionData = {[name: string]: SymbolInfo};

export interface NamesSet {
  version: number;
  data: {[name: string]: RawSymbolInfo};
}
