"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distinctIds = exports.getFilterByValue = void 0;
function getFilterByValue(filterBy, filterValue, sep = ',') {
    const names = filterBy.split(sep);
    const values = filterValue.split(sep);
    const nValues = values.length;
    const res = {};
    names.filter(Boolean).forEach((name, idx) => {
        const value = idx < nValues ? values[idx] : '';
        res[name] = value;
    });
    return res;
}
exports.getFilterByValue = getFilterByValue;
function distinctIds(list, getter) {
    return Array.from(new Set(list.map(getter).filter(Boolean)));
}
exports.distinctIds = distinctIds;
//# sourceMappingURL=repository.js.map