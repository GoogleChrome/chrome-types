import test from 'ava';
import * as model from '../lib/gen/model.js';
import {renderType} from '../lib/gen/render.js';


const voidType = new model.PrimitiveType('void');


test('sequence generation', t => {
  const f = new model.SequenceType(voidType, 3, 4);
  t.is(renderType(f), '[void, void, void] | [void, void, void, void]');

  const x = new model.SequenceType(voidType, 1, undefined);
  t.is(renderType(x), '[void, ...void[]]');
});

test('function render', t => {
  const voidProperty = new model.Property(voidType, 'arg');
  const f = new model.FunctionType([voidProperty], voidType);
  t.is(renderType(f), `(\n  arg: void,\n) => void`);

  voidProperty.description = 'Hello!';
  t.is(renderType(f), `(
  /**
   * Hello!
   */
  arg: void,
) => void`);

  voidProperty.deprecated = 'Deprecated sorry';
  t.is(renderType(f), `(
  /**
   * Hello!
   *
   * @deprecated Deprecated sorry
   */
  arg: void,
) => void`);
});
