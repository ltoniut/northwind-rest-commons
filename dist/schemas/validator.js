"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Val = void 0;
class Val {
    constructor(model) {
        this.model = model;
    }
    validate(model) {
        const res = { valid: true, errors: {} };
        Object.entries(this.model).forEach(([key, val]) => {
            if (key !== 'id') {
                console.log(key);
                const msg = val({ model, name: key, value: model[key] });
                if (msg) {
                    console.log(msg);
                    res.errors[key] = msg;
                    res.valid = false;
                }
            }
        });
        return res;
    }
    static getMessage(arg, msg) {
        if (typeof msg === 'string')
            return msg;
        return msg(arg);
    }
    static compose(...validators) {
        return function And(value) {
            for (let k = 0, n = validators.length; k < n; k++) {
                const val = validators[k];
                const msg = val(value);
                if (msg)
                    return msg;
            }
            return '';
        };
    }
    static truthy(message) {
        return arg => arg.value
            ? ''
            : Val.getMessage(arg, message || `Field '${arg.name}' should be truthy`);
    }
    static defined(message) {
        return arg => arg.value === null || arg.value === undefined
            ? Val.getMessage(arg, message || `Field '${arg.name}' should have a value`)
            : '';
    }
    static typeOf(aType, message) {
        return arg => typeof arg.value === aType
            ? ''
            : Val.getMessage(arg, message || `Field '${arg.name}' should be of type '${aType}'`);
    }
    static range({ min, max, throwNotNumber, }, message) {
        return arg => {
            if (typeof arg.value !== 'number')
                return throwNotNumber ? `Field '${arg.name}' is not a number` : '';
            if (typeof min === 'number' &&
                typeof max === 'number' &&
                (arg.value < min || arg.value > max))
                return Val.getMessage(arg, message || `Field '${arg.name}' should be between ${min} and ${max}`);
            if (typeof min === 'number' && arg.value < min)
                return Val.getMessage(arg, message || `Field '${arg.name}' minimum required is ${min}`);
            if (typeof max === 'number' && arg.value > max)
                return Val.getMessage(arg, message || `Field '${arg.name}' maximum required is ${max}`);
            return '';
        };
    }
    static anyOf(list, message) {
        return arg => list.includes(arg.value)
            ? ''
            : Val.getMessage(arg, message ||
                `Field '${arg.name}' is not inluded in [${list.join(', ')}]`);
    }
    static lengthOf({ min, max }, message) {
        return arg => {
            if (!arg.value)
                return '';
            if (arg.value.length === undefined)
                return '';
            const length = arg.value.length;
            if (typeof length !== 'number')
                return `Field length of '${arg.name}' is not a number`;
            if (typeof min === 'number' &&
                typeof max === 'number' &&
                (length < min || length > max))
                return Val.getMessage(arg, message || `Field '${arg.name}' should be between ${min} and ${max}`);
            if (typeof min === 'number' && length < min)
                return Val.getMessage(arg, message || `Field '${arg.name}' minimum required is ${min}`);
            if (typeof max === 'number' && length > max)
                return Val.getMessage(arg, message || `Field '${arg.name}' maximum required is ${max}`);
            return '';
        };
    }
    static instanceOf(classType, message) {
        return arg => arg.value instanceof classType
            ? ''
            : Val.getMessage(arg, message ||
                `Field '${arg.name}' is not an instance of ${classType.name}`);
    }
}
exports.Val = Val;
//# sourceMappingURL=validator.js.map