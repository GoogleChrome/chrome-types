⚠️ **If you're looking for TypeScript definitions for Chrome's extensions, you should depend on [chrome-types](https://www.npmjs.com/package/chrome-types) in your project.**

This repo contains JS which parses Chrome's internal extension definitions and outputs TypeScript Definition files.
You shouldn't depend on this code: rather, the _generated_ types file is published at [chrome-types](https://www.npmjs.com/package/chrome-types).
Depend on it for your Chrome extensions projects (MV3 and above).

## Design

This repo's design is documented in [the wiki](https://github.com/GoogleChrome/chrome-types/wiki).
Broadly, it reads Chromium's source code to find the internal extensions definitions (in IDL and JSON) and traverses them to generate ".d.ts" files—one for modern extension development (MV3+), and one for all extensions (including the deprecated Platform Apps APIs).

## Deploy

This code is run automatically on a daily basis by GitHub Actions.
It prepares a ".d.ts" file for Chrome's HEAD revision, annotated with information about the public Chrome release API first became available in, and publishes a new version if the output differs from the previous release.

## Usage

This repository is mostly intended as an implementation detail of the https://developer.chrome.com site and for publishing [chrome-types](https://www.npmjs.com/package/chrome-types) on NPM, which happens automaticalty as part of a GitHub Action.
You can run it yourself, but if you're just interested in the generated types, you don't need to.

Run "tools/prepare.js" to generate a bundle of JSON representing Chrome's extensions at a specific release.
You can then pass this bundle to other tools like "tools/render-tsd.js".
See [the wiki](https://github.com/GoogleChrome/chrome-types/wiki) for more.

Running the code requires Node 14+ as well as a working version of Python (3 is preferred, but 2.7+ should work) installed on your system.
This has only been tested on Linux and macOS.
Python is used to convert Chromium's internal IDL format to JSON.
