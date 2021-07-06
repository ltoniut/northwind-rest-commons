"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseControllerImpl = void 0;
const common_1 = require("@nestjs/common");
const User_decorator_1 = require("../../decorators/User.decorator");
const context_1 = require("../dtos/context");
const page_query_1 = require("../dtos/page-query");
const base_dto_1 = require("../dtos/base-dto");
const fields_query_1 = require("../dtos/fields-query");
const filter_query_1 = require("../dtos/filter-query");
class BaseControllerImpl {
    constructor(service, controllerPath, disabled = {}) {
        this.service = service;
        this.controllerPath = controllerPath;
        this.disabled = disabled;
    }
    getAll(ctx, filter) {
        if (this.disabled.getAll)
            throw new common_1.NotImplementedException();
        filter.baseUrl = `/${this.controllerPath}`;
        return this.service.getAll(ctx, filter);
    }
    getSingle(ctx, filter) {
        if (this.disabled.getSingle)
            throw new common_1.NotImplementedException();
        return this.service.getSingle(ctx, filter);
    }
    getById(ctx, id, fields) {
        if (this.disabled.getById)
            throw new common_1.NotImplementedException();
        return this.service.getById(ctx, id, fields);
    }
    create(ctx, fields, body) {
        if (this.disabled.create)
            throw new common_1.NotImplementedException();
        return this.service.create(ctx, fields, body);
    }
    update(ctx, id, fields, body) {
        if (this.disabled.update)
            throw new common_1.NotImplementedException();
        return this.service.update(ctx, id, fields, body);
    }
    delete(ctx, id) {
        if (this.disabled.delete)
            throw new common_1.NotImplementedException();
        return this.service.delete(ctx, id);
    }
}
__decorate([
    common_1.Get('/'),
    __param(0, User_decorator_1.UserContext()),
    __param(1, common_1.Query(page_query_1.PagePipe, common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [context_1.Context,
        page_query_1.PageQuery]),
    __metadata("design:returntype", Promise)
], BaseControllerImpl.prototype, "getAll", null);
__decorate([
    common_1.Get('/single/'),
    __param(0, User_decorator_1.UserContext()),
    __param(1, common_1.Query(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [context_1.Context,
        filter_query_1.FilterQuery]),
    __metadata("design:returntype", Promise)
], BaseControllerImpl.prototype, "getSingle", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, User_decorator_1.UserContext()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Query(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [context_1.Context, Number, fields_query_1.FieldsQuery]),
    __metadata("design:returntype", Promise)
], BaseControllerImpl.prototype, "getById", null);
__decorate([
    common_1.Post('/'),
    __param(0, User_decorator_1.UserContext()),
    __param(1, common_1.Query(common_1.ValidationPipe)),
    __param(2, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [context_1.Context,
        fields_query_1.FieldsQuery,
        base_dto_1.BaseDTO]),
    __metadata("design:returntype", Promise)
], BaseControllerImpl.prototype, "create", null);
__decorate([
    common_1.Patch('/:id'),
    __param(0, User_decorator_1.UserContext()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Query(common_1.ValidationPipe)),
    __param(3, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [context_1.Context, Number, fields_query_1.FieldsQuery,
        base_dto_1.BaseDTO]),
    __metadata("design:returntype", Promise)
], BaseControllerImpl.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, User_decorator_1.UserContext()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [context_1.Context, Number]),
    __metadata("design:returntype", Promise)
], BaseControllerImpl.prototype, "delete", null);
exports.BaseControllerImpl = BaseControllerImpl;
//# sourceMappingURL=controller-impl.js.map