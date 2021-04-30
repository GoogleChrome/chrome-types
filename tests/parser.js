import test from 'ava';
import { JSONSchemaParser } from '../lib/gen/parser.js';
import * as types from '../types/index.js';
import * as model from '../lib/gen/model.js';
import { Features } from '../lib/features/helpers.js';


const dummyFeatures = new Features({}, null);
const j = new JSONSchemaParser(dummyFeatures, ['fakeApi', 'ref']);


test('parser', t => {
  /** @type {types.RawNamespace} */
  const raw = {
    namespace: 'fakeApi',
    description: 'Use the <code>fakeApi</code> API to do some stuff. What about this $(ref:ref.foo) other API?',
    functions: [
      {
        type: 'function',
        name: 'specificMethod',
      },
    ]
  };

  const { namespace } = j.parse(raw)

  const expectedNamespace = new model.Namespace('fakeApi');

  Object.assign(expectedNamespace, {
    description: 'Use the `fakeApi` API to do some stuff. What about this {@link ref.foo} other API?',
    canonicalFeature: {
      supportedInChannel: 'stable',
    },
    feature: {
      supportedInChannel: 'stable',
    },
  });

  // Add an interpretation of the raw method.
  const specificMethodType = new model.FunctionType();
  const specificMethodProperty = new model.Property(specificMethodType, 'specificMethod');
  expectedNamespace.all['specificMethod'] = specificMethodProperty;
  Object.assign(specificMethodProperty, {
    canonicalFeature: {
      supportedInChannel: 'stable',
    },
  });

  t.deepEqual(namespace, expectedNamespace);
});
