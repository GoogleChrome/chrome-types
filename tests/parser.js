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
        parameters: [
          {
            'name': 'arg',
            'optional': true,
            'isInstanceOf': 'External',
          },
          {
            'name': 'arg2',
            'nodoc': true,
            'isInstanceOf': 'External',
          },
        ],
      },
      {
        type: 'function',
        name: 'nodocMethod',
        nodoc: true,
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

  const argType = new model.RefType('External', false);
  const argProperty = new model.Property(argType, 'arg');
  Object.assign(argProperty, {
    optional: true,
    canonicalFeature: {
      supportedInChannel: 'stable',
    },
  });

  const specificMethodType = new model.FunctionType([argProperty]);
  const specificMethodProperty = new model.Property(specificMethodType, 'specificMethod');
  expectedNamespace.all['specificMethod'] = specificMethodProperty;
  Object.assign(specificMethodProperty, {
    canonicalFeature: {
      supportedInChannel: 'stable',
    },
  });

  namespace.traverse((_path, prop) => {
    if (prop.nodoc) {
      return true;
    }
  });

  t.deepEqual(namespace, expectedNamespace);
});
