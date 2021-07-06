"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const class_transformer_1 = require("class-transformer");
const DefaultValue = (defaultValue) => {
    return class_transformer_1.Transform((target) => target || defaultValue);
};
exports.default = DefaultValue;
//# sourceMappingURL=DefaultValue.decorator.js.map