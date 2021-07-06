/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMetadataArgsStorage, ColumnOptions } from 'typeorm';
// eslint-disable-next-line import/no-unresolved
import { ColumnMetadataArgs } from 'typeorm/metadata-args/ColumnMetadataArgs';

export function CharColumn(options?: ColumnOptions): Function {
  const resultOptions = options || {};
  resultOptions.transformer = {
    from: (prop): string => (typeof prop === 'string' ? prop?.trim() : prop),
    to: (prop): string => (typeof prop === 'string' ? prop?.trim() : prop),
  };
  resultOptions.type = 'char';
  return function (object: Record<string, any>, propertyName: string) {
    getMetadataArgsStorage().columns.push({
      target: object.constructor,
      propertyName,
      options: resultOptions,
    } as ColumnMetadataArgs);
  };
}

/**
 * Is Find Operator?
 * @param prop Property passed to transform
 * @param valueCnd Condition to apply to prop.value. If a string is passed, a typeof compare will take place.
 */
function isFindOperator(prop, valueCnd) {
  if (!prop || typeof prop !== 'object') {
    return false;
  }
  const value = (prop as any)._value;
  if (typeof valueCnd === 'string') {
    const vType = valueCnd;
    // eslint-disable-next-line valid-typeof
    valueCnd = v => typeof v === vType;
  }
  if (typeof valueCnd !== 'function') {
    return false;
  }
  return valueCnd(value);
}

/**
 * Replace Operator Value
 * @param prop Property value passed to transform function
 * @param fn Replace function that will transform the value
 */
function replaceOpValue(prop: any, fn: (v: any) => any) {
  const oper = prop as { _value: any };
  oper._value = fn(oper._value);
  return oper;
}

/**
 * Replace function.
 * @param prop Property passed to transform
 * Supports some Find Operators. Ex: In, Like.
 * Extend if you find other ones.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function replaceFn(prop: any) {
  // Find Operator: In
  if (isFindOperator(prop, v => Array.isArray(v))) {
    return replaceOpValue(prop, v => v.map(replaceFn));
  }
  // Find Operator: Like
  if (isFindOperator(prop, 'string')) {
    return replaceOpValue(prop, v => replaceFn(v));
  }
  try {
    // Only replace whitespace at the end of string
    return (prop || '').replace(/\s+$/g, '');
  } catch (e) {
    // uncoment to solve the error you're having
    // console.log('CharColumn', { options, prop, value });
    throw new Error(`Error replacing prop:${typeof prop}=${prop}. ${e}`);
  }
}
