"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmCodeTransformer = void 0;
const generate_handlebars_1 = require("./generate-handlebars");
const source = `
import * as ORM from 'typeorm';

{{#each ctx.indexes}}
@ORM.Index('{{ key }}', {{{ col }}}, {{{ opt }}})
{{/each}}
@ORM.Entity('{{model.dbOptions.sqlName}}', { schema: '{{model.dbOptions.schema}}' })
export class {{model.name}} {
{{#each ctx.fields}}
  @ORM.{{{colType}}}({{{opt}}})
  {{name}}{{nullable}}: {{type}};

  {{/each}}
}
`;
class TypeOrmCodeTransformer extends generate_handlebars_1.HandlebarsTransformer {
    constructor() {
        super(source);
        this.indexes = [];
    }
    _init(model) {
        this.indexes = Object.entries(model.indexes).map(([key, idx]) => ({
            key,
            col: JSON.stringify(idx.columns),
            opt: JSON.stringify(idx.options),
        }));
        this.fields = Object.entries(model.fields)
            .map(([key, field]) => ({ key, field }))
            .filter(itm => model.isProperty(itm.key))
            .map(({ key, field }) => {
            const relation = model.relations[key];
            let columnType = '';
            let options = '';
            // Mounting decorator for Column
            if (field.generated) {
                columnType = 'PrimaryGeneratedColumn';
                options = `{ type: '${field.type}', name: '${field.name}' }`;
            }
            else if (model.isProperty(key)) {
                columnType = 'Column';
                const optionsValues = Object.entries(field)
                    .map(([key, value]) => ({ key, value }))
                    .filter(item => item.key !== 'fieldName' &&
                    item.key !== 'fieldType' &&
                    item.key !== 'type')
                    .map(({ key, value }) => `${key}: ${key === 'name' ? "'" : ''}${value}${key === 'name' ? "'" : ''}`)
                    .join(', ');
                options = `'${field.type}', { ${optionsValues} }`;
            }
            else {
                // TODO Set Relation values
                columnType = 'Column';
                const optionsValues = Object.entries(field)
                    .map(([key, value]) => ({ key, value }))
                    .filter(item => item.key !== 'fieldName' &&
                    item.key !== 'fieldType' &&
                    item.key !== 'type')
                    .map(({ key, value }) => `${key}: ${key === 'name' ? "'" : ''}${value}${key === 'name' ? "'" : ''}`)
                    .join(', ');
                options = `'${field.type}', { ${optionsValues} }`;
            }
            return {
                colType: columnType,
                opt: options,
                name: field.fieldName,
                nullable: field.nullable ? '?' : '',
                type: field.fieldType,
            };
        });
    }
    transform(model) {
        return this._transform(model, this);
    }
}
exports.TypeOrmCodeTransformer = TypeOrmCodeTransformer;
exports.default = new TypeOrmCodeTransformer();
//# sourceMappingURL=generate-code-typeorm.js.map