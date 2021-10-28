⚠️ **If you're looking for TypeScript definitions for Chrome's extension types, depend on [chrome-types](https://www.npmjs.com/package/chrome-types)!**

This repository contains code to parse Chrome's internal extension definitions to generate TypeScript definition files, to make it easy to develop Chrome extensions.
This code is not published, but the _generated_ ".d.ts" file is published at [chrome-types](https://www.npmjs.com/package/chrome-types), and you can depend on it for type information for your Chrome extensions projects (MV3 and above).

# Deploy

This code is run automatically on a daily basis by GitHub Actions.
It prepares a ".d.ts" file for Chrome's HEAD revision, annotated with information about the public Chrome release the API first became available in, and pushes a new version if the output differs from the previous release.

# Usage

This repository is mostly intended as an implementation detail of the https://developer.chrome.com site and for publishing [chrome-types](https://www.npmjs.com/package/chrome-types) on NPM, which happens automaticalty as part of a GitHub Action.

## Requirements

Running the types generator requires Node 14+ as well as a working version of Python (3 is preferred, but 2.7+ should work) installed on your system.
Currently this has only been tested on Linux and macOS.
The Python interpreter is used to convert Chromium's IDL files to JSON (see below).

## Tools

While the main tool used to prepare types for publishing is "tools/run-release.js", there's various other tools under "tools/" which are used to complete this task (and you can run them individually).

<!-- TODO: bring back this -->

# Design

The Chromium repository is read to generate types.
Running tools in this codebase will typically give different results over time, as the tools point to the HEAD revision of Chromium's codebase.

Types are generated from [extensions/common/api](https://chromium.googlesource.com/chromium/src/+/main/extensions/common/api) and [chrome/common/extensions/common/api](https://chromium.googlesource.com/chromium/src/+/main/chrome/common/extensions/api), both of which contain extension specifications and feature files.
The two folders exist to contain slightly different classes of extensions (Chrome-specific and more generic).

There's two main components in this repo, which are combined in interesting ways:

* JSON parser for Chromium's [internal types specification](https://chromium.googlesource.com/chromium/src/+/main/chrome/common/extensions/api/schemas.md)
  * Chromium also has types specified in IDL; these are converted to JSON before being parsed via Python script fetched as part of checking out Chromium
  * This generates JSON that's mostly documented inside "types/chrome.d.ts"

* Feature parser for Chromium's [feature format](https://chromium.googlesource.com/chromium/src/+/main/chrome/common/extensions/api/_features.md)
  * These features are heavily restricted to find APIs supported broadly (i.e., removing features that are limited to a specific extension allowlist or which require a command-line flag)
  * Features themselves can be simple, complex (multiple choices) and have multiple dependencies: they can be a graph of requirements that must all be met

By running "tools/prepare.js", both the above components are combined to generate a "bundle" of information for a specific Chrome version (a numbered historical version, or HEAD).
