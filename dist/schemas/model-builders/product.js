"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_builder_1 = require("../model-builder");
exports.default = model_builder_1.ModelBuilder.create('Product', {
    schema: 'dbo',
    sqlName: 'products',
})
    .index('id', ['id'], { unique: true })
    .column('id', 'number', {
    generated: true,
    type: 'int',
    name: 'id',
})
    .column('productName', 'string', {
    type: 'varchar',
    name: 'productName',
    length: 40,
    nullable: true,
})
    .column('customerId', 'number', {
    type: 'int',
    name: 'customerID',
    nullable: true,
})
    .column('categoryId', 'number', {
    type: 'int',
    name: 'categoryID',
    nullable: true,
})
    .column('quantityPerUnit', 'string', {
    type: 'varchar',
    name: 'customerID',
    length: 20,
    nullable: true,
})
    .column('unitPrice', 'number', {
    type: 'decimal',
    name: 'unitPrice',
    nullable: true,
})
    .column('unitsInStock', 'number', {
    type: 'int',
    name: 'unitsInStock',
    nullable: true,
})
    .column('unitsOnOrder', 'number', {
    type: 'int',
    name: 'unitsOnOrder',
    nullable: true,
})
    .column('reorderLevel', 'number', {
    type: 'int',
    name: 'reorderLevel',
    nullable: true,
})
    .column('discontinued', 'number', {
    type: 'tinyint',
    name: 'discontinued',
    nullable: true,
})
    .build();
//# sourceMappingURL=product.js.map