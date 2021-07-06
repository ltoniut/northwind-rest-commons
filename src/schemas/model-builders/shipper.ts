import { ModelBuilder } from '@src/schemas/model-builder';

export default ModelBuilder.create('Shipper', {
  schema: 'dbo',
  sqlName: 'shippers',
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
  .column('phone', 'string', {
    type: 'varchar',
    name: 'phone',
    length: 24,
    nullable: true,
  })
  .build();
