"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_builder_1 = require("../model-builder");
exports.default = model_builder_1.ModelBuilder.create('Supplier', {
    schema: 'dbo',
    sqlName: 'suppliers',
})
    .index('id', ['id'], { unique: true })
    .column('id', 'number', {
    generated: true,
    type: 'int',
    name: 'id',
})
    .column('companyName', 'string', {
    type: 'varchar',
    name: 'companyName',
    length: 40,
    nullable: true,
})
    .column('contactName', 'string', {
    type: 'varchar',
    name: 'contactName',
    length: 30,
    nullable: true,
})
    .column('contactTitle', 'string', {
    type: 'varchar',
    name: 'contactTitle',
    length: 30,
    nullable: true,
})
    .column('address', 'string', {
    type: 'varchar',
    name: 'address',
    length: 60,
    nullable: true,
})
    .column('city', 'string', {
    type: 'varchar',
    name: 'city',
    length: 15,
    nullable: true,
})
    .column('region', 'string', {
    type: 'varchar',
    name: 'region',
    length: 15,
    nullable: true,
})
    .column('country', 'string', {
    type: 'varchar',
    name: 'country',
    length: 15,
    nullable: true,
})
    .column('postalCode', 'string', {
    type: 'varchar',
    name: 'postalCode',
    length: 10,
    nullable: true,
})
    .column('phone', 'string', {
    type: 'varchar',
    name: 'phone',
    length: 24,
    nullable: true,
})
    .column('fax', 'string', {
    type: 'varchar',
    name: 'fax',
    length: 24,
    nullable: true,
})
    .column('homePage', 'string', {
    type: 'longtext',
    name: 'homePage',
    length: 10,
    nullable: true,
})
    .build();
//# sourceMappingURL=supplier.js.map