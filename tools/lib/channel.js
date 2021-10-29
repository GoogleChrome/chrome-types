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


import * as chromeTypes from '../../types/chrome.js';


/**
 * Defines the channel availability ordering. Earlier values imply availability in later ones.
 *
 * @type {chromeTypes.Channel[]}
 */
const channelOrdering = ['stable', 'beta', 'dev', 'canary', 'trunk'];


/**
 * Finds the channel that is closest to 'stable'. If either param is `undefined`, returns the other.
 *
 * @param {chromeTypes.Channel | undefined} a
 * @param {chromeTypes.Channel | undefined} b
 * @return {chromeTypes.Channel | undefined}
 */
export function mostReleasedChannel(a, b) {
  if (!a) {
    return b;
  } else if (!b) {
    return a;
  }

  const indexA = channelOrdering.indexOf(a);
  const indexB = channelOrdering.indexOf(b);

  if (indexA < indexB) {
    return a;
  } else {
    return b;
  }
}