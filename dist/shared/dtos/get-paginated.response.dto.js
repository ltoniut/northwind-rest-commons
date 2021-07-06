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
exports.GetPaginatedResponseDTO = exports.DefaultPageLimit = void 0;
const class_validator_1 = require("class-validator");
const response_dto_1 = require("./response.dto");
exports.DefaultPageLimit = 20;
class GetPaginatedResponseDTO extends response_dto_1.ResponseDTO {
    /**
     * Page
     * @param list List of Items
     * @param filter GetFilterDTO
     * @param count Total Record Count
     * @param meta Metadata
     */
    constructor(list, filter, count, meta) {
        super(list, meta);
        const { page } = filter;
        const limit = filter.limit || exports.DefaultPageLimit;
        this.page = typeof page !== 'undefined' ? page : 1;
        this.limit = limit;
        this.count = count;
        if (count > limit) {
            this.pages = count / limit;
            if (count % limit !== 0) {
                this.pages = Math.floor(this.pages) + 1;
            }
        }
        else {
            this.pages = 1;
        }
        // Call method to mount the links
        if (this.page <= this.pages) {
            this.mountLinks(filter);
        }
    }
    mountLinks(filter) {
        const currentPage = this.page;
        const lastPage = this.pages === 1 || currentPage === this.pages ? 0 : this.pages;
        const prevPage = this.page === 1 ? 0 : this.page;
        const nextPage = currentPage < lastPage ? currentPage + 1 : 0;
        const { baseUrl } = filter;
        const search = new URLSearchParams();
        Object.entries(filter)
            .filter(([key, val]) => {
            switch (key) {
                case 'baseUrl': // doesn't belong to the url
                    return false;
                case 'filterValues': // calculated value
                    return false;
                case 'offset': // calculated value
                    return false;
                default:
                    // only if a value is provided
                    return !!val;
            }
        })
            .forEach(([key, val]) => {
            search.append(key, `${val}`);
        });
        const links = {
            self: this.mountUrl(baseUrl || '/', search, { page: currentPage }),
            first: this.page === 1
                ? null
                : this.mountUrl(baseUrl || '/', search, { page: 1 }),
            last: lastPage === 0
                ? null
                : this.mountUrl(baseUrl || '/', search, { page: lastPage }),
            prev: prevPage === 0
                ? null
                : this.mountUrl(baseUrl || '/', search, { page: prevPage }),
            next: nextPage === 0
                ? null
                : this.mountUrl(baseUrl || '/', search, { page: nextPage }),
        };
        this.links = links;
    }
    mountUrl(baseUrl, search, keys) {
        search = new URLSearchParams(search);
        Object.entries(keys).forEach(([key, val]) => {
            search.append(key, `${val}`);
        });
        const sSearch = search.toString();
        return `${baseUrl}${sSearch ? '?' : ''}${sSearch}`;
    }
    mountMeta(meta) {
        this.meta = meta;
    }
}
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", Object)
], GetPaginatedResponseDTO.prototype, "links", void 0);
__decorate([
    class_validator_1.IsObject(),
    __metadata("design:type", Object)
], GetPaginatedResponseDTO.prototype, "meta", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], GetPaginatedResponseDTO.prototype, "page", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], GetPaginatedResponseDTO.prototype, "limit", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], GetPaginatedResponseDTO.prototype, "count", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], GetPaginatedResponseDTO.prototype, "pages", void 0);
exports.GetPaginatedResponseDTO = GetPaginatedResponseDTO;
//# sourceMappingURL=get-paginated.response.dto.js.map