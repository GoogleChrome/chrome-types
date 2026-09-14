/**
 * Copyright 2026 Google LLC
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

import * as chromeTypes from '../../types/chrome.js';


/**
 * Folds one release's stable symbols into the running history.
 *
 * A symbol first seen after the baseline gets that release as its low. A symbol that drops out
 * of stable and comes back starts again at the release it returns in, unless it comes back
 * already deprecated.
 *
 * @param {chromeTypes.AllReleasesSymbolData} allSymbols history so far, updated in place
 * @param {number} version release being folded in
 * @param {chromeTypes.ReleaseSymbolsData} symbols stable symbols of that release
 * @param {boolean} isBaseline true for the first release seen
 * @param {(message: string) => void} [warn]
 */
export function applyRelease(allSymbols, version, symbols, isBaseline, warn = () => {}) {
  for (const id in symbols) {
    const data = allSymbols[id] ?? { high: 0 };
    const returned = id in allSymbols && data.high < version - 1 && !symbols[id].deprecated;
    data.high = version;

    if (!(id in allSymbols)) {
      if (!isBaseline) {
        warn(`${id} started stable at ${version}`);
        data.low = version;
      }
      allSymbols[id] = data;
    } else if (returned) {
      warn(`${id} returned to stable at ${version} with low ${data.low}`);
      data.low = version;
    }

    if (symbols[id].deprecated) {
      // If we're newly deprecated, this might be at "version zero" (if it's the initial pass), or a
      // later version.
      if (data.deprecated === undefined) {
        data.deprecated = isBaseline ? 0 : version;
      }
    } else if (data.deprecated) {
      // This possibly never happens in practice.
      warn(`${id} now NOT deprecated`);
      delete data.deprecated;
    }
  }
}
