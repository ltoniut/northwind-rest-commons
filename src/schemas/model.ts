/* eslint-disable @typescript-eslint/no-explicit-any */
export type RelationType =
  | 'OneToOne'
  | 'OneToMany'
  | 'ManyToOne'
  | 'ManyToMany';

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

export type FieldType =
  | 'string'
  | 'boolean'
  | 'number'
  | 'Date'
  | 'array'
  | 'relation'
  | 'relationArray';

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

export type ModelTransformerFunc<T> = (model: Model, ctx?: any) => T;
export type ModelTransformer<T> = {
  transform: ModelTransformerFunc<T>;
};
export type ModelTransformerContext = {
  [key: string]: any;
};

export type DtoMeta = Record<string, any>;

export type Dto = {
  _type: string;
  _meta?: DtoMeta;
  [key: string]: any;
};

const models: Record<string, Model> = {};

export class Model {
  fields: Record<string, Field> = {};
  indexes?: Record<string, Index> = {};
  metas?: Record<string, any> = {};
  relations?: Record<string, any> = {};

  constructor(
    readonly name: string,
    readonly dbOptions: DbOptions,
    fields: Field[],
  ) {
    fields.forEach(f => {
      this.fields[f.fieldName] = f;
    });
  }

  static getModel(name: string): Model | undefined {
    return models[name];
  }

  static register(model: Model): Model {
    models[model.name] = model;
    return model;
  }

  isType(fieldName: string, ...typeNames: FieldType[]): boolean {
    const field: Field | undefined = this.fields[fieldName];
    if (!field) {
      return false;
    }
    return typeNames.some(tn => field.fieldType === tn);
  }

  isNotType(fieldName: string, ...typeNames: FieldType[]): boolean {
    const field: Field | undefined = this.fields[fieldName];
    if (!field) {
      return false;
    }
    return !typeNames.some(tn => field.fieldType === tn);
  }

  isProperty(fieldName: string): boolean {
    return this.isNotType(fieldName, 'relation', 'relationArray');
  }

  isFieldType(field: Field, ...typeNames: FieldType[]): boolean {
    return typeNames.some(tn => field.fieldType === tn);
  }
  isFieldNotType(field: Field, ...typeNames: FieldType[]): boolean {
    return !typeNames.some(tn => field.fieldType === tn);
  }
  isFieldProperty(field: Field): boolean {
    return this.isFieldNotType(field, 'relation', 'relationArray');
  }
}
