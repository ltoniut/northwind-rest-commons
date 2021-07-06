"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseFilterPipe = void 0;
class ParseFilterPipe {
    transform(value) {
        const page = value.page ? parseInt(value.page, 10) : 1;
        const limit = value.limit ? parseInt(value.limit, 10) : 20;
        const offset = page === 1 ? 0 : (page - 1) * limit;
        const sortField = value.sortField ? value.sortField : undefined;
        const sortDir = value.sortDir ? value.sortDir : 'ASC';
        const filterBy = value.filterBy ? value.filterBy : '';
        const filterValue = value.filterValue ? value.filterValue : '';
        return Object.assign(Object.assign({}, value), { page,
            limit,
            offset,
            sortField,
            sortDir,
            filterBy,
            filterValue });
    }
}
exports.ParseFilterPipe = ParseFilterPipe;
//# sourceMappingURL=parse-filter.pipe.js.map