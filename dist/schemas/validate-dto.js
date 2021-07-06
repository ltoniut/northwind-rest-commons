"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationModel = void 0;
const validator_1 = require("./validator");
function _validationField(model, field) {
    if (field.primary)
        return undefined; // do not validate primary fields
    const res = [];
    if (!field.nullable)
        res.push(validator_1.Val.defined());
    switch (field.fieldType) {
        case 'string':
            res.push(validator_1.Val.typeOf('string'));
            res.push(validator_1.Val.lengthOf({ max: field.length }));
            break;
        case 'number':
            res.push(validator_1.Val.typeOf('number'));
            break;
        case 'boolean':
            res.push(validator_1.Val.typeOf('boolean'));
            break;
        case 'Date':
            res.push(validator_1.Val.instanceOf(Date));
            break;
    }
    if (res.length === 0)
        return undefined;
    if (res.length === 1)
        return res[0];
    return validator_1.Val.compose(...res);
}
function validationModel(model) {
    const res = {};
    Object.values(model.fields)
        .filter(f => model.isFieldProperty(f))
        .forEach(f => {
        const val = _validationField(model, f);
        if (val)
            res[f.fieldName] = val;
    });
    return res;
}
exports.validationModel = validationModel;
//# sourceMappingURL=validate-dto.js.map