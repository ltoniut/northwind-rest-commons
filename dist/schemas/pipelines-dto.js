"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipeModel = void 0;
const pipelines_1 = require("./pipelines");
function _pipeField(model, field) {
    const res = [];
    switch (field.fieldType) {
        case 'Date':
            res.push(pipelines_1.Pipe.toDate);
            break;
        case 'string':
            res.push(pipelines_1.Pipe.trimEnd);
            break;
    }
    if (res.length === 0)
        return undefined;
    if (res.length === 1)
        return res[0];
    return pipelines_1.Pipe.compose(...res);
}
function pipeModel(model) {
    const res = {};
    Object.values(model.fields)
        .filter(f => model.isFieldProperty(f))
        .forEach(f => {
        const val = _pipeField(model, f);
        if (val)
            res[f.fieldName] = val;
    });
    return res;
}
exports.pipeModel = pipeModel;
//# sourceMappingURL=pipelines-dto.js.map