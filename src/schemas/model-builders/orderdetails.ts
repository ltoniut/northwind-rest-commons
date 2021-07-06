import { ModelBuilder } from '@src/schemas/model-builder';

export default ModelBuilder.create('OrderDetails', {
  schema: 'dbo',
  sqlName: 'order details',
})
  .index('id', ['id'], { unique: true })
  .column('id', 'number', {
    generated: true,
    type: 'int',
    name: 'id',
  })
  .column('supplierId', 'number', {
    type: 'int',
    name: 'supplierID',
    nullable: true,
  })
  .column('categoryId', 'number', {
    type: 'int',
    name: 'categoryID',
    nullable: true,
  })
  .column('quantityPerUnit', 'number', {
    type: 'int',
    name: 'quantityPerUnit',
  })
  .column('unitPrice', 'number', {
    type: 'int',
    name: 'unitPrice',
  })
  .column('quantity', 'number', {
    type: 'int',
    name: 'quantity',
  })
  .column('discount', 'number', {
    type: 'float',
    name: 'discount',
  })
  .build();
