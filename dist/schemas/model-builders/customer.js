"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_builder_1 = require("../model-builder");
exports.default = model_builder_1.ModelBuilder.create('Customer', {
    schema: 'dbo',
    sqlName: 'customers',
})
    .index('id', ['id'], { unique: true })
    .column('id', 'number', {
    generated: true,
    type: 'int',
    name: 'id',
})
    .column('internalId', 'string', {
    type: 'varchar',
    name: 'internalId',
    length: 5,
    nullable: true,
})
    .column('companyName', 'string', {
    type: 'varchar',
    name: 'companyName',
    length: 30,
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
    name: 'homePhone',
    length: 24,
    nullable: true,
})
    .column('fax', 'string', {
    type: 'varchar',
    name: 'fax',
    length: 24,
    nullable: true,
})
    .column('image', 'string', {
    type: 'longblob',
    name: 'image',
    nullable: true,
})
    .column('imageThumbnail', 'string', {
    type: 'longblob',
    name: 'imageThumbnail',
    nullable: true,
})
    .build();
//# sourceMappingURL=customer.js.map