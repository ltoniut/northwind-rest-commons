"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelBuilder = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
const model_1 = require("./model");
class ModelBuilder {
    constructor(name, dbOptions) {
        this.name = name;
        this.dbOptions = dbOptions;
        this.fields = [];
        this.indexes = {};
        this.metas = {};
        this.relations = [];
    }
    static create(name, dbOptions) {
        return new ModelBuilder(name, Object.assign({ sqlName: name, schema: 'dbo' }, dbOptions));
    }
    column(fieldName, fieldType, opts) {
        this.fields.push(Object.assign({ fieldName,
            fieldType }, opts));
        return this;
    }
    index(name, columns, options = {}) {
        this.indexes[name] = { columns, options };
        return this;
    }
    meta(name, value) {
        this.metas[name] = value;
        return this;
    }
    relation(relationType, referencedTable, referencedField, fieldName, joinColumnOptions) {
        const cOptions = Object.entries(joinColumnOptions).map(([name, referencedColumn]) => ({
            name,
            referencedColumn,
        }));
        this.fields.push({
            fieldName,
            fieldType: 'relation',
            type: '',
            name: '',
            fkType: referencedTable,
        });
        this.relations.push({
            relationType,
            referencedTable,
            referencedField,
            fieldName,
            joinColumnOptions: cOptions,
        });
        return this;
    }
    one2One(fieldName, referencedTable, joinColumnOptions, opts) {
        const cOptions = Object.entries(joinColumnOptions).map(([name, referencedColumn]) => ({
            name,
            referencedColumn,
        }));
        this.fields.push(Object.assign({ fieldName, fieldType: 'relation', type: '', name: '', fkType: referencedTable, nullable: true }, opts));
        this.relations.push({
            relationType: 'OneToOne',
            referencedTable,
            referencedField: fieldName,
            fieldName,
            joinColumnOptions: cOptions,
        });
        return this;
    }
    array(fieldName, fieldType, opts) {
        this.fields.push(Object.assign({ fieldName, fieldType: 'array', fkType: fieldType }, opts));
        return this;
    }
    build() {
        const model = new model_1.Model(this.name, this.dbOptions, this.fields);
        model.indexes = Object.assign({}, this.indexes);
        model.metas = Object.assign({}, this.metas);
        return model_1.Model.register(model);
    }
}
exports.ModelBuilder = ModelBuilder;
//# sourceMappingURL=model-builder.js.map