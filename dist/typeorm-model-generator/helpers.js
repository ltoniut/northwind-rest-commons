"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelizeCapitalized = exports.sqlServerToJSTypes = exports.camelize = exports.projectTitle = void 0;
exports.projectTitle = 'Northwind Rest Commons';
function camelize(value) {
    return value.replace(/^([A-Z])|[\s-_]+(\w)/g, (__match, prevPart, nextPart) => {
        return nextPart ? nextPart.toUpperCase() : prevPart.toLowerCase();
    });
}
exports.camelize = camelize;
exports.sqlServerToJSTypes = {
    char: 'string',
    varchar: 'string',
    text: 'string',
    nchar: 'string',
    nvarchar: 'string',
    ntext: 'string',
    binary: 'string',
    varbinary: 'string',
    image: 'string',
    bit: 'number',
    tinyint: 'number',
    smallint: 'number',
    int: 'number',
    bigint: 'number',
    decimal: 'number',
    numeric: 'number',
    smallmoney: 'number',
    money: 'number',
    float: 'number',
    real: 'number',
    datetime: 'Date',
    datetime2: 'Date',
    smalldatetime: 'Date',
    date: 'Date',
    time: 'Date',
    datetimeoffset: 'Date',
    timestamp: 'Date',
    longblob: 'string',
};
const camelizeCapitalized = (string) => {
    return `${string[0].toUpperCase()}${camelize(string.substr(1))}`;
};
exports.camelizeCapitalized = camelizeCapitalized;
//# sourceMappingURL=helpers.js.map