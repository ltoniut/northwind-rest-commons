export declare type RelationType = 'OneToOne' | 'OneToMany' | 'ManyToOne' | 'ManyToMany';
export interface FieldOpts {
    type: string;
    name: string;
    generated?: boolean;
    primary?: boolean;
    length?: number;
    width?: number;
    nullable?: boolean;
    unique?: boolean;
    precision?: number;
    scale?: number;
    unsigned?: boolean;
    enum?: string[];
    array?: boolean;
    comment?: string;
    fkType?: string;
    fkIds?: Record<string, string>;
}
export declare type FieldType = 'string' | 'boolean' | 'number' | 'Date' | 'array' | 'relation' | 'relationArray';
export interface Field extends FieldOpts {
    fieldName: string;
    fieldType: FieldType;
}
export interface Index {
    columns: string[];
    options?: Record<string, string>;
}
export interface DbOptions {
    schema: string;
    sqlName: string;
}
export declare type ModelTransformerFunc<T> = (model: Model, ctx?: any) => T;
export declare type ModelTransformer<T> = {
    transform: ModelTransformerFunc<T>;
};
export declare type ModelTransformerContext = {
    [key: string]: any;
};
export declare type DtoMeta = Record<string, any>;
export declare type Dto = {
    _type: string;
    _meta?: DtoMeta;
    [key: string]: any;
};
export declare class Model {
    readonly name: string;
    readonly dbOptions: DbOptions;
    fields: Record<string, Field>;
    indexes?: Record<string, Index>;
    metas?: Record<string, any>;
    relations?: Record<string, any>;
    constructor(name: string, dbOptions: DbOptions, fields: Field[]);
    static getModel(name: string): Model | undefined;
    static register(model: Model): Model;
    isType(fieldName: string, ...typeNames: FieldType[]): boolean;
    isNotType(fieldName: string, ...typeNames: FieldType[]): boolean;
    isProperty(fieldName: string): boolean;
    isFieldType(field: Field, ...typeNames: FieldType[]): boolean;
    isFieldNotType(field: Field, ...typeNames: FieldType[]): boolean;
    isFieldProperty(field: Field): boolean;
}
