⚠️ _If you're looking for TypeScript definitions for Chrome's extension types, you should depend on [chrome-types](https://www.npmjs.com/package/chrome-types)!_

This repository contains code to parse Chrome's internal extensions definitions, to generate both a JS model and publish TypeScript definition files.
It itself is published at [chrome-types-helpers](https://npmjs.com/package/chrome-types-helpers), and you can depend on this to build the JS model.
Its generated ".d.ts" file is published at [chrome-types](https://www.npmjs.com/package/chrome-types), and you can depend on it for type information for your Chrome extensions projects (MV3 and above).

# Usage

This repository is mostly intended as an implementation detail of the https://developer.chrome.com site and for publishing [chrome-types](https://www.npmjs.com/package/chrome-types) on NPM, which happens automaticalty as part of a GitHub Action.

However, if you'd like to build and consume the JS model of extensions are part of your project, you can depend on this project (published as `chrome-types-helpers`) and see its published types.

## Requirements

This helper repository requires Node 14+ as well as a working version of Python 2.7+ installed on your system.
Currently this has only been tested on Linux and macOS.
The Python interpreter is used to convert Chromium's IDL files to JSON (see below).

## Exports

This module exports a single helper function called `prepareNamespaces` which fetches Chromium's source code at head, and parses its internal types specifications and feature files (see below) to generate a JS model.
You might use this to render information about Chrome's extension APIs (as we do on [developer.chrome.com](https://developer.chrome.com)).

## Tools

There's various tools under "bin/" which you can run as part of this repo if you check it out directly:

* **tsd.js:** generates a ".d.ts" file for Chromium's extension types
  * This does _not_ include Platform Apps and other deprecated APIs, and only renders APIs compatiable [with MV3+](https://developer.chrome.com/docs/extensions/mv3/intro/))

* **history.js:** fetches older versions of Chromium to find APIs that have changed over time
  * This generates (and accepts, to keep moving forward) a history JSON file that [looks like this](https://unpkg.com/chrome-types@latest/history.json)

* **prepare.js:** is used internally to prepare a ".d.ts" and the history JSON for regular publish to NPM, and is probably not interesting to the public
  * It internally runs both scripts above

# Design

The Chromium repository is read to generate types.
Running tools in this codebase will give different results over time, as the tools point to the head of Chromium's codebase, which will change over time.

Types are generated from [extensions/common/api](https://chromium.googlesource.com/chromium/src/+/main/extensions/common/api) and [chrome/common/extensions/common/api](https://chromium.googlesource.com/chromium/src/+/main/chrome/common/extensions/api), both of which contain extension specifications and feature files.
The two folders exist to contain slightly different classes of extensions (Chrome-specific and more generic).

There's two main components in this repo, which are combined in interesting ways:

* JSON parser for Chromium's [internal types specification](https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/api/schemas.md)
  * Chromium also has types specified in IDL; these are converted to JSON before being parsed via Python script fetched as part of checking out Chromium
  * This generates a parsed JS model unique to this repo

* Feature parser for Chromium's [feature format](https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/api/_features.md)
  * These features are heavily restricted to find APIs supported broadly (i.e., removing features that are limited to a specific extension whitelist or which require a command-line flag)
  * Features themselves can be simple, complex (multiple choices) and have multiple dependencies: they can be a graph of requirements that must all be met
