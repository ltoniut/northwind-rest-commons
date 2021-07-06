"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_builder_1 = require("schemas/model-builder");
exports.default = model_builder_1.ModelBuilder.create('Foo')
    .column('id', 'number')
    .column('name', 'string')
    .column('createdAt', 'Date')
    .column('qty', 'number')
    .build();
//# sourceMappingURL=Foo.js.map