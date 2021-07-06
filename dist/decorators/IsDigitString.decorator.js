"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCodeDate = exports.IsLot = exports.IsProduct = exports.IsBatch = exports.IsDigitString = void 0;
const class_validator_1 = require("class-validator");
function IsDigitString(size, validationOptions) {
    return function isDigitStringRegister(object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isDigitString',
            target: object.constructor,
            propertyName,
            constraints: [size],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedSize] = args.constraints;
                    return (typeof value === 'string' &&
                        value.length <= relatedSize &&
                        /^\d+$/.test(value));
                },
            },
        });
    };
}
exports.IsDigitString = IsDigitString;
function customDigitString(name, size, msg, validationOptions) {
    return function isRegister(object, propertyName) {
        class_validator_1.registerDecorator({
            name,
            target: object.constructor,
            propertyName,
            constraints: [size],
            options: Object.assign({ message: msg }, validationOptions),
            validator: {
                // eslint-disable-next-line sonarjs/no-identical-functions
                validate(value, args) {
                    const [relatedSize] = args.constraints;
                    return (typeof value === 'string' &&
                        value.length <= relatedSize &&
                        /^\d+$/.test(value));
                },
            },
        });
    };
}
function customValidator(name, msg, predicate, validationOptions) {
    return function isRegister(object, propertyName) {
        class_validator_1.registerDecorator({
            name,
            target: object.constructor,
            propertyName,
            constraints: [],
            options: Object.assign({ message: msg }, validationOptions),
            validator: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                validate(value, args) {
                    return predicate(value);
                },
            },
        });
    };
}
function IsBatch(validationOptions) {
    return customDigitString('isBatch', 7, 'Batch Format: 7 digits', validationOptions);
}
exports.IsBatch = IsBatch;
function IsProduct(validationOptions) {
    return customValidator('isProduct', 'Product Format: 16 digits or letters', (v) => {
        if (typeof v !== 'string') {
            return false;
        }
        return /^[a-zA-Z0-9]{0,16}/.test(v);
    }, validationOptions);
}
exports.IsProduct = IsProduct;
function IsLot(validationOptions) {
    return customDigitString('isLot', 16, 'Lot Format: 16 digits', validationOptions);
}
exports.IsLot = IsLot;
function IsCodeDate(validationOptions) {
    return customDigitString('isCodeDate', 6, 'Code Date Format: 6 digits', validationOptions);
}
exports.IsCodeDate = IsCodeDate;
//# sourceMappingURL=IsDigitString.decorator.js.map