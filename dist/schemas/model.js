"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const models = {};
class Model {
    constructor(name, dbOptions, fields) {
        this.name = name;
        this.dbOptions = dbOptions;
        this.fields = {};
        this.indexes = {};
        this.metas = {};
        this.relations = {};
        fields.forEach(f => {
            this.fields[f.fieldName] = f;
        });
    }
    static getModel(name) {
        return models[name];
    }
    static register(model) {
        models[model.name] = model;
        return model;
    }
    isType(fieldName, ...typeNames) {
        const field = this.fields[fieldName];
        if (!field) {
            return false;
        }
        return typeNames.some(tn => field.fieldType === tn);
    }
    isNotType(fieldName, ...typeNames) {
        const field = this.fields[fieldName];
        if (!field) {
            return false;
        }
        return !typeNames.some(tn => field.fieldType === tn);
    }
    isProperty(fieldName) {
        return this.isNotType(fieldName, 'relation', 'relationArray');
    }
    isFieldType(field, ...typeNames) {
        return typeNames.some(tn => field.fieldType === tn);
    }
    isFieldNotType(field, ...typeNames) {
        return !typeNames.some(tn => field.fieldType === tn);
    }
    isFieldProperty(field) {
        return this.isFieldNotType(field, 'relation', 'relationArray');
    }
}
exports.Model = Model;
//# sourceMappingURL=model.js.map