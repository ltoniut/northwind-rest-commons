"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_builder_1 = require("schemas/model-builder");
exports.default = model_builder_1.ModelBuilder.create('Bar')
    .column('id', 'number')
    .column('name', 'string')
    .column('idOwner', 'number')
    .relation('OneToOne', 'Foo', 'idOwner', 'owner', {
    idOwner: 'id',
})
    .build();
//# sourceMappingURL=Bar.js.map