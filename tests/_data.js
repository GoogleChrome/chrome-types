import { Features } from '../lib/features/helpers.js';
import * as types from '../types/index.js';


/** @type {types.RawFeatureFile} */
const features = {
  'api:fakeApi': {
    extension_types: ['extension'],
    contexts: ['blessed_extension', 'lock_screen_extension'],
    dependencies: ['permission:fakeApiPermission'],
  },
  'api:fakeApi.specificMethod': {
    dependencies: ['permission:specificMethodPermission'],
  },
  'permission:fakeApiPermission': {
    // nothing, just sets as permission
  },
  'permission:specificMethodPermission': {
    disallow_for_service_workers: true,
    channel: 'stable',
  },
  'api:allowlistOnly': {
    allowlist: ['abc'],
  },
  'api:invalidExtensionType': {
    dependencies: ['api:invalidExtensionTypeDep'],
    extension_types: ['extension'],
  },
  'api:invalidExtensionTypeDep': {
    extension_types: ['shared_module'],
  },
};


/** @type {types.SymbolsVersionInfo} */
const versionData = {
  'fakeApi.specificMethod': {
    low: 100,
  },
  'fakeApi': {},
  'fakeApi.some.dependency': {},
};


export const testFeatures = new Features(features, versionData);