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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageQuery = exports.PagePipe = exports.GetPageDTOLimit = void 0;
const class_validator_1 = require("class-validator");
const filter_query_1 = require("./filter-query");
exports.GetPageDTOLimit = 20;
class PagePipe {
    transform(src) {
        const dst = new PageQuery(Object.assign(Object.assign({}, src), { page: src.page ? parseInt(`${src.page}`, 10) : undefined, limit: src.limit ? parseInt(`${src.limit}`, 10) : undefined }));
        return dst;
    }
}
exports.PagePipe = PagePipe;
class PageQuery extends filter_query_1.FilterQuery {
    constructor(src = {}) {
        super(src);
    }
    get pageDTO() {
        const baseUrl = this.baseUrl || '';
        const limit = this.limit || exports.GetPageDTOLimit;
        const offset = (this.page || 0) * limit;
        const sortMatch = (this.sort || '').match(/([+-]?)([a-z0-9]+)/i);
        const sortField = sortMatch ? sortMatch[2] : '';
        const sortDir = sortMatch && sortMatch[1] !== '-' ? 'ASC' : 'DESC';
        return { baseUrl, limit, offset, sortField, sortDir };
    }
    sortAsc() {
        return !/^[-]/.test(this.sort || '');
    }
    sortField() {
        return (this.sort || '').replace(/[+-]/, '');
    }
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PageQuery.prototype, "baseUrl", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], PageQuery.prototype, "page", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], PageQuery.prototype, "limit", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PageQuery.prototype, "sort", void 0);
exports.PageQuery = PageQuery;
//# sourceMappingURL=page-query.js.map