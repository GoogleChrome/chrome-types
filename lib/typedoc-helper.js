/**
 * Copyright 2020 Google LLC
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
 * Extract the singular exported namespace from generated TypeDoc.
 * 
 * We don't actually know the namespace this is exporting. We could parse it with TypeDoc
 * but this is overkill since we just need the singular namespace name.
 *
 * @param {string|Buffer} raw
 * @return {string} namespace starting with `chrome.`
 */
export function extractNamespaceName(raw) {
  const namespaceRegexp = /^  export namespace (.*?) {/gm;
  const fallbackRegexp = /^  namespace _debugger {/gm;

  raw = raw.toString('utf-8');

  const namespaceMatch = namespaceRegexp.exec(raw);
  if (namespaceMatch) {
    return `chrome.${namespaceMatch[1]}`;
  }

  const fallbackMatch = fallbackRegexp.exec(raw);
  if (fallbackMatch) {
    return `chrome.${fallbackMatch[1]}`;
  }

  throw new Error(`could not extract namespace`);
}
