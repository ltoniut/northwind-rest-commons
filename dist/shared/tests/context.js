"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockContext = void 0;
const context_1 = require("../dtos/context");
function mockContext(overrides = {}) {
    return new context_1.Context(Object.assign({ userId: 4, finitials: 'ERA', fpassword: 'FUDGE', fname: 'EILEEN ROSE', fmenu: 'MMENU', flevel: 5, email: 'ltoniut@gmail.com' }, overrides));
}
exports.mockContext = mockContext;
//# sourceMappingURL=context.js.map