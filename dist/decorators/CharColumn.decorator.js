"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharColumn = void 0;
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
const typeorm_1 = require("typeorm");
function CharColumn(options) {
    const resultOptions = options || {};
    resultOptions.transformer = {
        from: (prop) => (typeof prop === 'string' ? prop === null || prop === void 0 ? void 0 : prop.trim() : prop),
        to: (prop) => (typeof prop === 'string' ? prop === null || prop === void 0 ? void 0 : prop.trim() : prop),
    };
    resultOptions.type = 'char';
    return function (object, propertyName) {
        typeorm_1.getMetadataArgsStorage().columns.push({
            target: object.constructor,
            propertyName,
            options: resultOptions,
        });
    };
}
exports.CharColumn = CharColumn;
/**
 * Is Find Operator?
 * @param prop Property passed to transform
 * @param valueCnd Condition to apply to prop.value. If a string is passed, a typeof compare will take place.
 */
function isFindOperator(prop, valueCnd) {
    if (!prop || typeof prop !== 'object') {
        return false;
    }
    const value = prop._value;
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
function replaceOpValue(prop, fn) {
    const oper = prop;
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
function replaceFn(prop) {
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
    }
    catch (e) {
        // uncoment to solve the error you're having
        // console.log('CharColumn', { options, prop, value });
        throw new Error(`Error replacing prop:${typeof prop}=${prop}. ${e}`);
    }
}
//# sourceMappingURL=CharColumn.decorator.js.map