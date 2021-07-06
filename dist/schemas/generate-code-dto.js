"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoCodeTransformer = void 0;
const generate_handlebars_1 = require("./generate-handlebars");
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
class DtoCodeTransformer extends generate_handlebars_1.HandlebarsTransformer {
    constructor() {
        super(source);
        this.fields = [];
        this.relations = [];
    }
    _init(model) {
        this.fields = Object.values(model.fields).map(f => ({
            name: f.fieldName,
            nullable: f.nullable ? '?' : '',
            type: this._codeType(model, f),
        }));
        this.relations = Object.values(model.fields)
            .filter(f => f.fieldType === 'relation')
            .map(f => ({ table: f.fkType }));
    }
    transform(model) {
        return this._transform(model, this);
    }
    _codeType(model, field) {
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
exports.DtoCodeTransformer = DtoCodeTransformer;
exports.default = new DtoCodeTransformer();
//# sourceMappingURL=generate-code-dto.js.map