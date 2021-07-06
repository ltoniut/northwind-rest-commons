import { HandlebarsTransformer } from './generate-handlebars';
import { Model, Field } from './model';

const source = `
import { Exclude, Expose } from 'class-transformer';
{{#each ctx.relations}}
import { {{ table }} } from 'models/{{ table }}';
{{/each}}

@Exclude()
export class {{ model.name }}Dto {
{{#each ctx.fields}}
  @Expose()
  {{ name }}{{ nullable }}: {{ type }};

{{/each}}
}
`;

export class DtoCodeTransformer extends HandlebarsTransformer {
  fields: { name: string; nullable: string; type: string }[] = [];
  relations: { table: string }[] = [];
  constructor() {
    super(source);
  }

  _init(model: Model): void {
    this.fields = Object.values(model.fields).map(f => ({
      name: f.fieldName,
      nullable: f.nullable ? '?' : '',
      type: this._codeType(model, f),
    }));
    this.relations = Object.values(model.fields)
      .filter(f => f.fieldType === 'relation')
      .map(f => ({ table: f.fkType }));
  }

  transform(model: Model): string {
    return this._transform(model, this);
  }

  _codeType(model: Model, field: Field): string {
    switch (field.fieldType) {
      case 'number':
        return 'number';
      case 'array':
        return `${field.fkType}[]`;
      case 'relation':
        return `${field.fkType}`;
      case 'relationArray':
        return `${field.fkType}[]`;
      default:
        return field.fieldType;
    }
  }
}

export default new DtoCodeTransformer();
