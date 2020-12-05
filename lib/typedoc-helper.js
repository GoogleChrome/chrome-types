

/**
 * Extract the singular exported namespace from generated TypeDoc.
 * 
 * We don't actually know the namespace this is exporting. We could parse it with TypeDoc
 * but this is overkill since we just need the singular namespace name. Instead we just regexp
 * for it with a single exception for _debugger.
 *
 * @param {string|Buffer} raw
 * @return {string} namespace starting with `chrome.`
 */
export function extractNamespaceName(raw) {
  // nb. create here so these are not sticky with raw string
  const namespaceRegexp = /^declare namespace (.*?) {/gm;
  const fallbackRegexp = /^\s+namespace _(.*?) {/gm;

  raw = raw.toString('utf-8');

  const namespaceMatch = namespaceRegexp.exec(raw);
  if (namespaceMatch) {
    return namespaceMatch[1];
  }

  const fallbackMatch = fallbackRegexp.exec(raw);
  if (fallbackMatch) {
    return `chrome.${fallbackMatch[1]}`;
  }

  throw new Error(`could not extract namespace`);
}
