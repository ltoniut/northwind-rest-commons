"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserContext = void 0;
const common_1 = require("@nestjs/common");
const context_1 = require("../shared/dtos/context");
exports.UserContext = common_1.createParamDecorator((data, ctx) => {
    const http = ctx.switchToHttp();
    const req = http.getRequest();
    req.user = { name: 'Leandro' };
    const { user } = req;
    if (!user) {
        throw new common_1.UnauthorizedException();
    }
    return new context_1.Context(Object.assign({ req }, user));
});
//# sourceMappingURL=User.decorator.js.map