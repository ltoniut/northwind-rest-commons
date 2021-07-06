import { ModelBuilder } from 'schemas/model-builder';

export default ModelBuilder.create('Foo')
  .column('id', 'number')
  .column('name', 'string')
  .column('createdAt', 'Date')
  .column('qty', 'number')
  .build();
