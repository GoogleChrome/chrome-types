

const keywords = [
  'debugger',
  'delete',
  'import',
  'export',
  'void',
  'function',
  'switch',
  // There's more, but we only hit a few for now.
];

/**
 * @param {string} arg 
 * @return {boolean}
 */
export function isValidToken(arg) {
  if (keywords.includes(arg)) {
    return false;
  }
  if (arg[0] >= '0' && arg[0] <= '9') {
    return false;
  }

  return true;
}
