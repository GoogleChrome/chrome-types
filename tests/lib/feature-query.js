import test from 'ava';
import { FeatureQuery, FeatureQueryModern } from '../../tools/lib/feature-query.js';

test('most stable channel is preferred', (t) => {
  const featureQuery = new FeatureQuery({});

  t.deepEqual(
    featureQuery.mergeComplexFeature([
      { channel: 'beta' },
      { channel: 'stable', location: 'policy' },
    ]),
    { channel: 'stable', location: 'policy' }
  );
});

test('extension features are preferred', (t) => {
  const featureQuery = new FeatureQuery({});

  t.deepEqual(
    featureQuery.mergeComplexFeature([
      { channel: 'stable', extension_types: ['hosted_app'] },
      { channel: 'stable', min_manifest_version: 3, extension_types: ['extension'] }
    ]),
    { channel: 'stable', min_manifest_version: 3, extension_types: ['extension'] }
  );
});

test('extension_types "all" is preferred like an explicit list', (t) => {
  const featureQuery = new FeatureQuery({});

  // Chrome's feature files may give extension_types as the string "all" rather than an array
  // (see feature_compiler.py's `allow_all`). That still has to count as including "extension".
  t.deepEqual(
    featureQuery.mergeComplexFeature([
      { channel: 'stable', extension_types: ['hosted_app'] },
      { channel: 'stable', min_manifest_version: 3, extension_types: 'all' }
    ]),
    { channel: 'stable', min_manifest_version: 3, extension_types: 'all' }
  );
});

test('MV3+ filter keeps extension_types "all"', (t) => {
  // This is the site that dropped runtime.lastError: extension_types: "all" has to pass the
  // same as an explicit array containing "extension".
  const featureQuery = new FeatureQueryModern({});

  t.assert(featureQuery.filter({ channel: 'stable', extension_types: 'all' }));
});

test('non-location specific features are preferred', (t) => {
  const featureQuery = new FeatureQuery({});

  t.deepEqual(
    featureQuery.mergeComplexFeature([
      { channel: 'stable', feature_flag: 'my_feature_flag' },
      { channel: 'stable', location: 'policy' }
    ]),
    { channel: 'stable', feature_flag: 'my_feature_flag' }
  );
});
