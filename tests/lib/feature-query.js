import test from 'ava';
import { FeatureQuery } from '../../tools/lib/feature-query.js';

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

test('any alternative makes the API available', (t) => {
  const featureQuery = new FeatureQuery({
    'api:declarativeNetRequest': [
      { dependencies: ['permission:declarativeNetRequest'] },
      { dependencies: ['permission:declarativeNetRequestWithHostAccess'] },
    ],
    'permission:declarativeNetRequest': { channel: 'stable' },
    'permission:declarativeNetRequestWithHostAccess': { channel: 'trunk' },
  });

  t.deepEqual(featureQuery.mergeComplexFeature([
    { dependencies: ['permission:a'] },
    { dependencies: ['permission:b'] },
  ]), {
    dependencies: ['permission:a', 'permission:b'],
    alternativeDependencies: [['permission:a'], ['permission:b']],
  });
  t.is(featureQuery.channelFor('api:declarativeNetRequest'), 'stable');
  t.is(featureQuery.channelFor('permission:declarativeNetRequestWithHostAccess'), 'trunk');
});
