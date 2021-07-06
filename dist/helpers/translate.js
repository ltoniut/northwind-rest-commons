"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
// MAKE SURE the name of your import matches the name of the file you are importing
const resource_json_1 = __importDefault(require("../i18n/en/resource.json"));
const translationFiles = {
    resource: resource_json_1.default,
};
const translate = async (translator, file, key, value) => {
    const translationKey = `${file}.${key}`;
    return (value === null || value === void 0 ? void 0 : value.length) ? translator.translate(translationKey, { args: value })
        : translator.translate(translationKey);
};
exports.translate = translate;
//# sourceMappingURL=translate.js.map