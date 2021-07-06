"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const class_transformer_1 = require("class-transformer");
const TrimValue = () => {
    return class_transformer_1.Transform((target) => typeof target === 'string' ? target.trim() : target);
};
exports.default = TrimValue;
//# sourceMappingURL=TrimValue.decorator.js.map