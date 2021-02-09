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

/**
 * @fileoverview Helpers that tease out complex types from TypeDoc's representations.
 */


import * as typedocModels from 'typedoc/dist/lib/models/index.js';
import * as symbol from '../../types/symbol.js';


/**
 * @param {typedocModels.Reflection=} reflection
 * @return {boolean}
 */
export function isOptional(reflection) {
  if (!reflection) {
    return false;
  }
  return reflection.flags.hasFlag(typedocModels.ReflectionFlag.Optional);
}


/**
 * Finds an array type from the passed model type. This is required as we also infer restricted
 * array types from tuples, intersection and union types.
 *
 * @param {typedocModels.Type=} type
 * @return {{
 *   min?: number,
 *   max?: number,
 *   elementType: typedocModels.Type,
 * }=}
 */
export function matchArrayType(type) {
  if (!type) {
    return;
  }

  if (type.type === 'reflection') {
    const literal = internalMatchTypeLiteralOnly(type);
    if (literal) {
      const properties = literal;
      if (!properties['0']) {
        return;
      }
      const zeroReflection = properties[0];
      if (!zeroReflection.type) {
        return;
      }
      const check = new Set(Object.keys(properties));

      let i = 0;
      for (;;) {
        const key = `${i}`;
        const reflection = properties[key];
        if (reflection === undefined) {
          break;
        }
        if (isOptional(reflection) || !reflection.type?.equals(zeroReflection.type)) {
          return;
        }
        check.delete(key);
        ++i;
      }
      if (check.size) {
        return;
      }

      return {min: i, max: i, elementType: zeroReflection.type};
    }
  }

  if (type.type === 'array') {
    const arrayType = /** @type {typedocModels.ArrayType} */ (type);
    return {elementType: arrayType.elementType};
  }

  if (type.type === 'tuple') {
    const tupleType = /** @type {typedocModels.TupleType} */ (type);
    const [first, ...rest] = tupleType.elements;

    // We just support tuples of the same type. This is an array of fixed length.
    const invalid = rest.some(check => !check.equals(first));
    if (!first || invalid) {
      return;
    }

    const length = tupleType.elements.length;
    return {
      min: length,
      max: length,
      elementType: first,
    };
  }

  const isIntersection = (type.type === 'intersection');
  if (isIntersection || type.type === 'union') {
    const t = /** @type {typedocModels.IntersectionType|typedocModels.UnionType} */ (type);

    const firstArray = matchArrayType(t.types[0]);
    if (!firstArray) {
      return;
    }

    let min = firstArray.min ?? 0;
    let max = firstArray.max ?? Infinity;

    // Make sure all other types in this intersection are also arrays of the same elementType.
    // In reality, this will probably only ever be (A & B), but it could be more.
    for (let i = 1; i < t.types.length; ++i) {
      const restArray = matchArrayType(t.types[i]);
      if (!restArray || !restArray.elementType.equals(firstArray.elementType)) {
        return;
      }

      // TODO(samthor): This isn't right for a bunch of cases but we probably don't care right now.
      // For instance, `[T, T] & [T, T, T, T]` would also allow 3 elements, because the return type
      // doesn't support passing both around. (Perhaps an inner accumulator could be more correct?)
      // This doesn't actually appear in Chrome's extension code right now.
      if (isIntersection) {
        min = Math.max(min, restArray.min ?? 0);
        max = Math.max(max, restArray.max ?? Infinity);
      } else {
        min = Math.min(min, restArray.min ?? 0);
        max = Math.max(max, restArray.max ?? Infinity);
      }
    }

    const out = {
      elementType: firstArray.elementType,
    };
    if (min !== 0) {
      out.min = min;
    }
    if (max !== Infinity) {
      out.max = max;
    }
  
    return out;
  }
}


/**
 * @param {typedocModels.Type} type
 * @return {{[name: string]: typedocModels.DeclarationReflection}=}
 */
export function internalMatchTypeLiteralOnly(type) {
  if (type.type !== 'reflection') {
    return;
  }

  const reflectionType = /** @type {typedocModels.ReflectionType} */ (type);
  const declaration = reflectionType.declaration;
  if (declaration.kind !== typedocModels.ReflectionKind.TypeLiteral) {
    return;
  }

  /** @type {{[name: string]: typedocModels.DeclarationReflection}} */
  const properties = {};
  (declaration.children ?? []).forEach((child) => {
    properties[child.name] = child;
  });
  return properties;
}


/**
 * Finds a type literal, possibly intersected with another initial root type.
 *
 * The intersection case is found inside {@link chrome.storage} as some type instances also have
 * properties applied to them.
 *
 * @param {typedocModels.Type=} type
 * @return {{
 *   root?: typedocModels.Type,
 *   properties: {[name: string]: typedocModels.DeclarationReflection},
 * }=}
 */
export function matchTypeLiteral(type) {
  if (!type) {
    return;
  }

  // This could just be a type literal on its own.
  const internal = internalMatchTypeLiteralOnly(type);
  if (internal) {
    return {properties: internal};
  }

  // Otherwise, see if this is an intersection with a type literal only.
  if (type.type !== 'intersection') {
    return;
  }
  const t = /** @type {typedocModels.IntersectionType} */ (type);

  /** @type {{[name: string]: typedocModels.DeclarationReflection}} */
  const properties = {};

  const firstTypeLiteral = internalMatchTypeLiteralOnly(t.types[0]);
  if (firstTypeLiteral !== undefined) {
    // This was a type literal, not a root. Assign outside the loop below.
    Object.assign(properties, firstTypeLiteral);
  }

  for (let i = 1; i < t.types.length; ++i) {
    const restTypeLiteral = internalMatchTypeLiteralOnly(t.types[i]);
    if (!restTypeLiteral) {
      // We expect this to be of a certain shape: it has properties and no other type.
      return;
    }
    Object.assign(properties, restTypeLiteral);
  }

  const out = {properties};
  if (firstTypeLiteral === undefined) {
    out.root = t.types[0];
  }
  return out;
}


/**
 * Finds an enum made up of literal values (e.g., specific numbers, strings and so on).
 *
 * This accepts a reflection, not a type, as we must be able to infer that this is a TypeAlias.
 *
 * @param {typedocModels.Reflection=} reflection
 * @return {symbol.LiteralTypeOption[]|undefined}
 */
export function matchEnum(reflection) {
  if (!(reflection instanceof typedocModels.DeclarationReflection)) {
    return;
  }

  if (reflection.kind !== typedocModels.ReflectionKind.TypeAlias) {
    return;
  }
  const {type: stringType} = reflection.type ?? {type: ''};

  // Try to find a single literal under a TypeAlias.
  if (stringType === 'literal') {
    const literalType = /** @type {typedocModels.LiteralType} */ (reflection.type);
    return [literalType.value];
  }

  if (stringType !== 'union') {
    return;
  }
  const unionType = /** @type {typedocModels.UnionType} */ (reflection.type);
  const literalTypes = [];
  for (const candidate of unionType.types) {
    if (!(candidate instanceof typedocModels.LiteralType)) {
      // This is too hard, don't try to enum this.
      return;
    }
    literalTypes.push(candidate);
  }

  return literalTypes.map(({value}) => value);
}


/**
 * Finds a single function definition based on many possible signatures. This is entirely to deal
 * with Chrome's middle-optional arguments. For two signatures like:
 * 
 * func(number, string, string?)
 * func(string, string?)
 *
 * This will return three arguments: [number?, string, string?].
 * 
 * This will not match if the types are incompatible.
 *
 * TODO(samthor): When we include the Promise<> return type, this will fail.
 *
 * @param {typedocModels.Reflection=} reflection
 * @return {{
 *   returnType: typedocModels.Type,
 *   parameters: {
 *     name: string,
 *     type: typedocModels.Type,
 *     optional: boolean,
 *     reflection: typedocModels.ParameterReflection,
 *   }[],
 *   signature: typedocModels.SignatureReflection,
 * }=}
 */
export function matchUnifiedFunction(reflection) {
  if (!(reflection instanceof typedocModels.DeclarationReflection) || !reflection.signatures?.length) {
    return;
  }

  const {signatures} = reflection;
  signatures.sort((a, b) => {
    return (b.parameters?.length ?? 0) - (a.parameters?.length ?? 0);
  });
  const bestSignature = /** @type {typedocModels.SignatureReflection} */ (signatures[0]);
  const returnType = /** @type {typedocModels.Type} */ (bestSignature.type);

  const parameters = (bestSignature.parameters ?? []).map((param) => {
    return {
      name: param.name,
      type: /** @type {typedocModels.Type} */ (param.type),
      optional: isOptional(param),
      reflection: param,
    };
  });

  for (let i = 1; i < signatures.length; ++i) {
    const other = signatures[i];
    if (!other.type?.equals(returnType)) {
      // Abandon if the return type is not the same.
      return;
    }

    // Walk through the parameters of the smaller type and look for gaps. If we find any, then
    // update the return parameters to be optional (even on the left). This will also abandon
    // if we can't find an in-order matching type in the larger signature.

    let workParameters = parameters.slice();
    for (const otherParam of other.parameters ?? []) {
      const update = workParameters.findIndex(({name}) => name === otherParam.name);
      if (update === -1) {
        // The param wasn't found in the best candidate.
        return;
      }
      if (!otherParam.type?.equals(workParameters[update].type)) {
        // The type wasn't the same.
        // TODO(samthor): TypeDoc can't match all callback function types NOR can it match type
        // literals correctly. Don't bail out just yet.
      }
 
      for (let i = 0; i < update; ++i) {
        workParameters[i].optional = true;
      }
      workParameters = workParameters.slice(update + 1);
    }

    // It doesn't matter if workParameters still has values, this just means the parameters weren't
    // specified in the smaller type.
  }

  return {
    returnType,
    parameters,
    signature: bestSignature,
  };
}


/**
 * Checks if this is a union of undefined and something else, returning the other type. This is
 * sometimes how variables are expressed as optional (as they cannot have ? applied to them).
 *
 * @param {typedocModels.Type} type
 * @return {typedocModels.Type=}
 */
export function matchOptionalType(type) {
  if (type.type !== 'union') {
    return;
  }
  const unionType = /** @type {typedocModels.UnionType} */ (type);
  if (unionType.types.length !== 2) {
    return;
  }

  const filtered = unionType.types.filter((t) => {
    if (t.type !== 'intrinsic') {
      return true;
    }
    const it = /** @type {typedocModels.IntrinsicType} */ (t);
    return it.name !== 'undefined';
  });
  if (filtered.length !== 1) {
    return;
  }

  return filtered[0];
}
