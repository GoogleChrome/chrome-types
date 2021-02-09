/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License t
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import test from 'ava';
import {parse, typeOf} from './helper.js';
import {matchArrayType, matchEnum, matchTypeLiteral, matchUnifiedFunction, isOptional} from '../../../lib/types/match.js';
import * as typedocModels from 'typedoc/dist/lib/models/index.js';
import { matchOptionalType } from '../../../lib/types/match.js';


test('array types', t => {
  const project = parse(`
export type Foo = {0: number, 1: number} & number[];
export type FooInvalid = {0: number} & string[];
export type FooTuple = [number, number, number];
  `);

  const fooType = typeOf(project, 'Foo');
  const fooArray = matchArrayType(fooType);
  t.is(fooArray?.min, 2);
  t.is(fooArray?.max, undefined);
  t.truthy(fooArray?.elementType);

  return;

  const fooInvalidType = typeOf(project, 'FooInvalid');
  t.falsy(matchArrayType(fooInvalidType));

  const fooTupleType = typeOf(project, 'FooTuple');
  const fooTupleArray = matchArrayType(fooTupleType);
  t.is(fooTupleArray?.min, 3);
  t.is(fooTupleArray?.max, 3);
  t.truthy(fooTupleArray?.elementType);
});

test('type literal', t => {
  const project = parse(`
export var shared: Date & {
  hello?: number;
  fn(arg: undefined): string;
};
export type literalOnly = { foo: 123 };
export var solo: Date;
  `);

  const sharedType = typeOf(project, 'shared');
  const sharedLiteral = matchTypeLiteral(sharedType);
  t.truthy(sharedLiteral?.properties?.['hello'], 'shared literal must have hello');
  t.truthy(sharedLiteral?.root, 'shared literal must have root');

  t.truthy(sharedLiteral?.properties?.['fn']);
  const dt = /** @type {typedocModels.DeclarationReflection} */ (sharedLiteral?.properties?.['fn']);
  t.is(dt.signatures?.length, 1);

  const literalOnlyType = typeOf(project, 'literalOnly');
  const literalOnlyLiteral = matchTypeLiteral(literalOnlyType);
  t.falsy(literalOnlyLiteral?.root);
  t.truthy(literalOnlyLiteral?.properties?.['foo']);
  t.falsy(isOptional(literalOnlyLiteral?.properties?.['foo']));

  const soloType = typeOf(project, 'solo');
  t.falsy(matchTypeLiteral(soloType), 'type without TypeLiteral is ignored');
});

test('string enum', t => {
  const project = parse(`
export type Single = 'single';
export type Multi = 'one' | 'two' | 345;
  `);

  const singleReflection = project.getChildByName('Single');
  const singleEnum = matchEnum(singleReflection);
  t.deepEqual(singleEnum, ['single']);

  const multiReflection = project.getChildByName('Multi');
  const multiEnum = matchEnum(multiReflection);
  t.deepEqual(multiEnum, ['one', 'two', 345]);
});

test('unified function', t => {
  const project = parse(`
export function foo(a: number, b: string, c?: string): void;
export function foo(b: string, c?: string): void;
export function foo(b: string): void;

export function bar(a: number, b: string): void;
export function bar(q: string): void;
`);

  const fooReflection = project.getChildByName('foo');
  const fooUnified = matchUnifiedFunction(fooReflection);
  t.truthy(fooUnified);
  t.is(fooUnified?.parameters.length, 3);
  t.true(fooUnified?.parameters[0].optional, '0th arg optional, missing in short signature');
  t.false(fooUnified?.parameters[1].optional, '1st arg required');
  t.true(fooUnified?.parameters[2].optional, '2nd arg optional');

  const barReflection = project.getChildByName('bar');
  t.falsy(matchUnifiedFunction(barReflection), 'incompatible signatures should not match');
});

test('optional var', t => {
  const project = parse(`
export var foo: number | undefined;
export var bar: number | null;
`);

  const fooType = typeOf(project, 'foo');
  t.truthy(matchOptionalType(fooType), 'foo should be number');

  const barType = typeOf(project, 'bar');
  t.falsy(matchOptionalType(barType), 'bar is not optional');
});
