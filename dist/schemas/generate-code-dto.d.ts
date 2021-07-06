import { HandlebarsTransformer } from './generate-handlebars';
import { Model, Field } from './model';
export declare class DtoCodeTransformer extends HandlebarsTransformer {
    fields: {
        name: string;
        nullable: string;
        type: string;
    }[];
    relations: {
        table: string;
    }[];
    constructor();
    _init(model: Model): void;
    transform(model: Model): string;
    _codeType(model: Model, field: Field): string;
}
declare const _default: DtoCodeTransformer;
export default _default;
