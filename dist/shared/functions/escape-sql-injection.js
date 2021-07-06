"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeSQLLiteral = exports.isEscapedSQLInjection = void 0;
function isEscapedSQLInjection(value) {
    return !(value.includes("'") || value.includes('"') || value.includes('\\'));
}
exports.isEscapedSQLInjection = isEscapedSQLInjection;
function safeSQLLiteral(value) {
    return value.replace(/'|"\/\/|;/gi, '');
}
exports.safeSQLLiteral = safeSQLLiteral;
//# sourceMappingURL=escape-sql-injection.js.map