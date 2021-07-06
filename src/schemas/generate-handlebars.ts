/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as handlebars from 'handlebars';
import { Model, ModelTransformerContext } from './model';

export class HandlebarsTransformer {
  template: HandlebarsTemplateDelegate<any>;

  constructor(readonly source: string) {
    this.template = handlebars.compile(source);
  }

  _transform(model: Model, ctx: ModelTransformerContext = {}): string {
    if (typeof ctx._init === 'function') ctx._init(model);
    return this.template({ ctx, model });
  }
}
