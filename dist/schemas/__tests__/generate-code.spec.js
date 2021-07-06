"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("schemas/model");
require("../model-builders/index");
require("../__mocks__/index");
const generate_code_dto_1 = __importDefault(require("schemas/generate-code-dto"));
const generate_code_typeorm_1 = __importDefault(require("schemas/generate-code-typeorm"));
const foo = model_1.Model.getModel('Foo');
const bar = model_1.Model.getModel('Bar');
const wcsQueueHistory = model_1.Model.getModel('WcsQueueHistory');
describe('Generate DTOs', () => {
    it('Should generate code for Foo', () => {
        const code = generate_code_dto_1.default.transform(foo);
        expect(code).toBeDefined();
        console.log(code);
    });
    it('Should generate code for Bar', () => {
        const code = generate_code_dto_1.default.transform(bar);
        expect(code).toBeDefined();
        console.log(code);
    });
    it('Should generate code for WcsQueueHistory', () => {
        const code = generate_code_dto_1.default.transform(wcsQueueHistory);
        expect(code).toBeDefined();
        console.log(code);
    });
});
describe('Generate TypeORM entities', () => {
    it('Should generate code for WcsQueueHistory entity', () => {
        const code = generate_code_typeorm_1.default.transform(wcsQueueHistory);
        expect(code).toBeDefined();
        console.log(code);
    });
});
//# sourceMappingURL=generate-code.spec.js.map