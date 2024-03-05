# chrome-types
Published TypeScript definition files for Chrome Extensions, automatically generated from Chromium source code.

The default types file "index.d.ts" contains MV3+ types only.

The helper "_all.d.ts" contains types including the deprecated Platform Apps APIs, and is used for the developer.chrome.com site.

## Set Up

To expose the global `chrome` namespace be sure to include `chrome-types` in your `tsconfig.json`. You could add `"chrome-types"` to the `compilerOptions.types` array, though you will then need to include each type definitions you want. It is recommended that you add `"node_modules/chrome-types/global.d.ts"` to the `include` array instead.

### `compilerOptions.types`

```JSON
{
  "compilerOptions": {
    "types": ["chrome-types"]
  }
}
```

### `include`

```JSON
{
  "include": ["node_modules/chrome-types/global.d.ts"]
}
```
