import { ModelBuilder } from '@src/schemas/model-builder';

export default ModelBuilder.create('Employee', {
  schema: 'dbo',
  sqlName: 'employees',
})
.index('id', ['id'], { unique: true })
.column('id', 'number', {
  generated: true,
  type: 'int',
  name: 'id',
})
.column('lastName', 'string', {
  type: 'varchar',
  name: 'lastName',
  length: 20,
})
.column('firstName', 'string', {
  type: 'varchar',
  name: 'firstName',
  length: 10,
})
.column('title', 'string', {
  type: 'varchar',
  name: 'title',
  length: 30,
  nullable: true,
})
.column('titleOfCourtesy', 'string', {
  type: 'varchar',
  name: 'titleOfCourtesy',
  length: 25,
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
.column('homePhone', 'string', {
  type: 'varchar',
  name: 'homePhone',
  length: 24,
  nullable: true,
})
.column('extension', 'string', {
  type: 'varchar',
  name: 'homePhone',
  length: 4,
  nullable: true,
})
.column('fax', 'string', {
  type: 'varchar',
  name: 'fax',
  length: 24,
  nullable: true,
})
.column('birthDate', 'Date', {
  type: 'datetime',
  name: 'birthDate',
})
.column('hireDate', 'Date', {
  type: 'datetime',
  name: 'hireDate',
})
.column('photo', 'string', {
  type: 'longblob',
  name: 'photo',
  nullable: true,
})
.column('reportsTo', 'number', {
  type: 'int',
  name: 'reportsTo',
  nullable: true,
})
.build();