import { DbOptions, Model, Field, FieldOpts, FieldType, Index, RelationType } from './model';
export declare class ModelBuilder {
    readonly name: string;
    readonly dbOptions: DbOptions;
    fields: Field[];
    indexes: Record<string, Index>;
    metas: Record<string, any>;
    relations?: any[];
    constructor(name: string, dbOptions: DbOptions);
    static create(name: string, dbOptions?: DbOptions): ModelBuilder;
    column(fieldName: string, fieldType: FieldType, opts?: FieldOpts): ModelBuilder;
    index(name: string, columns: string[], options?: any): ModelBuilder;
    meta(name: string, value: any): ModelBuilder;
    relation(relationType: RelationType, referencedTable: string, referencedField: string, fieldName: string, joinColumnOptions: Record<string, string>): ModelBuilder;
    one2One(fieldName: any, referencedTable: any, joinColumnOptions: Record<string, string>, opts?: FieldOpts): ModelBuilder;
    array(fieldName: string, fieldType: string, opts?: FieldOpts): ModelBuilder;
    build(): Model;
}
