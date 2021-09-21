import test from 'ava';
import * as model from '../lib/gen/model.js';


const voidType = new model.PrimitiveType('void');
const numberType = new model.PrimitiveType('number');


test('function expansion', t => {
  const propRequired = new model.Property(numberType, 'req');
  const propOptional = propRequired.clone();
  propOptional.optional = true;
  propOptional.name = 'opt';

  const f = new model.FunctionType([propOptional, propRequired], voidType);
  const {expansions} = f;
  t.is(expansions.length, 2);

  const longer = expansions[0];
  const shorter = expansions[1];

  t.is(longer.length, 3);
  t.is(shorter.length, 2);

  const nowRequired = longer[1];
  t.is(nowRequired.optional, false);
  t.is(nowRequired.name, 'opt');
  t.not(nowRequired, propOptional, 'should not clone propOptional');
});

test('function returnsAsync', t => {
  // This is technically a property (because the generated non-Promise version needs it and has
  // a name).
  const prop = new model.Property(numberType, 'something');

  const returnsAsyncType = new model.FunctionType([prop], voidType);
  const returnsAsyncProperty = new model.Property(returnsAsyncType, 'callback');

  const f = new model.FunctionType([], returnsAsyncProperty, true);
  const {expansions} = f;
  t.is(expansions.length, 2);

  // Check that the Promise expansion returns `Promise<number>`, as it takes the singular param.
  const promise = expansions[0];
  const expectedType = new model.RefType('Promise', false, [prop.type]);
  t.is(promise.length, 1);
  t.deepEqual(promise[0].type, expectedType);

  // Check that the callback expansion returns void and has a function callback.
  const callback = expansions[1];
  t.is(callback.length, 2);
  t.deepEqual(callback[0].type, voidType);
  t.deepEqual(callback[1].name, 'callback');
  t.deepEqual(callback[1].type, returnsAsyncType);
});