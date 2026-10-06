Published TypeScript definition files for Chrome Extensions, automatically generated from Chromium source code.

The default types file "index.d.ts" contains MV3+ types only, declared on the browser global (Chrome 148+), with chrome aliasing it.

The helper "no-browser.d.ts" contains those types under chrome only, for extensions supporting Chrome 147 or earlier, or projects that already declare a global browser.

The helper "_all.d.ts" contains types including the deprecated Platform Apps APIs, and is used for the developer.chrome.com site.
