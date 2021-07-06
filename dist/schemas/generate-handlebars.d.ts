import { Model, ModelTransformerContext } from './model';
export declare class HandlebarsTransformer {
    readonly source: string;
    template: HandlebarsTemplateDelegate<any>;
    constructor(source: string);
    _transform(model: Model, ctx?: ModelTransformerContext): string;
}
