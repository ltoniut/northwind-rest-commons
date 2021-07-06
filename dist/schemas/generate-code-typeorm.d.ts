import { HandlebarsTransformer } from './generate-handlebars';
import { Model } from './model';
export declare class TypeOrmCodeTransformer extends HandlebarsTransformer {
    indexes: {
        key: string;
        col: string;
        opt: string;
    }[];
    fields: {
        colType: string;
        opt: string;
        name: string;
        nullable: string;
        type: string;
    }[];
    constructor();
    _init(model: Model): void;
    transform(model: Model): string;
}
declare const _default: TypeOrmCodeTransformer;
export default _default;
