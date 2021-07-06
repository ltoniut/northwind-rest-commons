import { Model } from 'schemas/model';
import '../model-builders/index';
import '../__mocks__/index';
import dtoTransformer from 'schemas/generate-code-dto';
import typeOrmTransformer from 'schemas/generate-code-typeorm';

const foo = Model.getModel('Foo');
const bar = Model.getModel('Bar');
const wcsQueueHistory = Model.getModel('WcsQueueHistory');

describe('Generate DTOs', () => {
  it('Should generate code for Foo', () => {
    const code = dtoTransformer.transform(foo);
    expect(code).toBeDefined();
    console.log(code);
  });
  it('Should generate code for Bar', () => {
    const code = dtoTransformer.transform(bar);
    expect(code).toBeDefined();
    console.log(code);
  });
  it('Should generate code for WcsQueueHistory', () => {
    const code = dtoTransformer.transform(wcsQueueHistory);
    expect(code).toBeDefined();
    console.log(code);
  });
});

describe('Generate TypeORM entities', () => {
  it('Should generate code for WcsQueueHistory entity', () => {
    const code = typeOrmTransformer.transform(wcsQueueHistory);
    expect(code).toBeDefined();
    console.log(code);
  });
});
