/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DbOptions,
  Model,
  Field,
  FieldOpts,
  FieldType,
  Index,
  RelationType,
} from './model';

export class ModelBuilder {
  fields: Field[] = [];
  indexes: Record<string, Index> = {};
  metas: Record<string, any> = {};
  relations?: any[] = [];

  constructor(readonly name: string, readonly dbOptions: DbOptions) {}

  static create(name: string, dbOptions?: DbOptions): ModelBuilder {
    return new ModelBuilder(name, {
      sqlName: name,
      schema: 'dbo',
      ...dbOptions,
    });
  }

  column(
    fieldName: string,
    fieldType: FieldType,
    opts?: FieldOpts,
  ): ModelBuilder {
    this.fields.push({
      fieldName,
      fieldType,
      ...opts,
    });
    return this;
  }

  index(name: string, columns: string[], options: any = {}): ModelBuilder {
    this.indexes[name] = { columns, options };
    return this;
  }

  meta(name: string, value: any): ModelBuilder {
    this.metas[name] = value;
    return this;
  }

  relation(
    relationType: RelationType,
    referencedTable: string,
    referencedField: string,
    fieldName: string,
    joinColumnOptions: Record<string, string>,
  ): ModelBuilder {
    const cOptions = Object.entries(joinColumnOptions).map(
      ([name, referencedColumn]) => ({
        name,
        referencedColumn,
      }),
    );

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

  one2One(
    fieldName,
    referencedTable,
    joinColumnOptions: Record<string, string>,
    opts?: FieldOpts,
  ): ModelBuilder {
    const cOptions = Object.entries(joinColumnOptions).map(
      ([name, referencedColumn]) => ({
        name,
        referencedColumn,
      }),
    );

    this.fields.push({
      fieldName,
      fieldType: 'relation',
      type: '',
      name: '',
      fkType: referencedTable,
      nullable: true,
      ...opts,
    });
    this.relations.push({
      relationType: 'OneToOne',
      referencedTable,
      referencedField: fieldName,
      fieldName,
      joinColumnOptions: cOptions,
    });
    return this;
  }

  array(fieldName: string, fieldType: string, opts?: FieldOpts): ModelBuilder {
    this.fields.push({
      fieldName,
      fieldType: 'array',
      fkType: fieldType,
      ...opts,
    });
    return this;
  }

  build(): Model {
    const model = new Model(this.name, this.dbOptions, this.fields);
    model.indexes = { ...this.indexes };
    model.metas = { ...this.metas };
    return Model.register(model);
  }
}
