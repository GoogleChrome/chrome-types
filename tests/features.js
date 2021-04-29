import test from 'ava';


import { testFeatures } from './_data.js';


test('api and generic child dependency', t => {
  const result = testFeatures.query('api:fakeApi');
  t.deepEqual(result, {
    supportedInChannel: 'stable',
    permissions: ['fakeApiPermission'],
  });

  const resultChild = testFeatures.query('api:fakeApi.some.dependency');
  t.deepEqual(resultChild, result, 'misc dependency should match parent feature');
});


test('specific method override', t => {
  const resultSpecificMethod = testFeatures.query('api:fakeApi.specificMethod');
  t.deepEqual(resultSpecificMethod, {
    availableFromVersion: 100,
    disallowForServiceWorkers: true,
    permissions: ['specificMethodPermission'],
    supportedInChannel: 'stable',
  }, 'specific feature should have overrides');
});


test('disallow cases', t => {
  const resultAllowlistOnly = testFeatures.query('api:allowlistOnly');
  t.is(resultAllowlistOnly, null);

  const resultInvalidExtensionType = testFeatures.query('api:invalidExtensionType');
  t.is(resultInvalidExtensionType, null);
});
