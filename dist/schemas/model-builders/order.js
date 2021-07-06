"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_builder_1 = require("../model-builder");
exports.default = model_builder_1.ModelBuilder.create('Order', {
    schema: 'dbo',
    sqlName: 'orders',
})
    .index('id', ['id'], { unique: true })
    .column('id', 'number', {
    generated: true,
    type: 'int',
    name: 'id',
})
    .column('customerId', 'string', {
    type: 'varchar',
    name: 'customerID',
    length: 5,
    nullable: true,
})
    .column('orderDate', 'Date', {
    type: 'datetime',
    name: 'orderDate',
})
    .column('requiredDate', 'Date', {
    type: 'datetime',
    name: 'requiredDate',
})
    .column('shippedDate', 'Date', {
    type: 'datetime',
    name: 'shippedDate',
})
    .column('shipVia', 'number', {
    type: 'int',
    name: 'shipVia',
    nullable: true,
})
    .column('freight', 'number', {
    type: 'decimal',
    name: 'freight',
    nullable: true,
})
    .column('shipName', 'string', {
    type: 'varchar',
    name: 'shipName',
    length: 40,
    nullable: true,
})
    .column('shipAddress', 'string', {
    type: 'varchar',
    name: 'shipAddress',
    length: 60,
    nullable: true,
})
    .column('shipCity', 'string', {
    type: 'varchar',
    name: 'shipCity',
    length: 15,
    nullable: true,
})
    .column('shipRegion', 'string', {
    type: 'varchar',
    name: 'shipRegion',
    length: 15,
    nullable: true,
})
    .column('shipPostalCode', 'string', {
    type: 'varchar',
    name: 'shipPostalCode',
    length: 10,
    nullable: true,
})
    .column('shipCountry', 'string', {
    type: 'varchar',
    name: 'shipCountry',
    length: 15,
    nullable: true,
})
    .build();
//# sourceMappingURL=order.js.map