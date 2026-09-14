Published TypeScript definition files for Chrome Extensions, automatically generated from Chromium source code.

The default types file "index.d.ts" contains MV3+ types only, declared on the `browser` global (Chrome 148+) and aliased as `chrome.*`.

The helper "no-browser.d.ts" contains the same types under `chrome` only, for extensions that support Chrome 147 or earlier.

The helper "_all.d.ts" contains types including the deprecated Platform Apps APIs, and is used for the developer.chrome.com site.
