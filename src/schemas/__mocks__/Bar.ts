import { ModelBuilder } from 'schemas/model-builder';

export default ModelBuilder.create('Bar')
  .column('id', 'number')
  .column('name', 'string')
  .column('idOwner', 'number')
  .relation('OneToOne', 'Foo', 'idOwner', 'owner', {
    idOwner: 'id',
  })
  .build();
