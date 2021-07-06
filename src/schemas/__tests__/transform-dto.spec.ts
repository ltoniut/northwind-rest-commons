import { Dto } from 'schemas/model';
import dtoTransformer, { TransformDtoOptions } from 'schemas/transform-dto';
// eslint-disable-next-line
import '../__mocks__/index';

const foo1 = {
  _type: 'Foo',
  id: 1,
  name: 'foo',
  createdAt: '2020-12-29T00:22:12.543Z',
  qty: 3.4,
};

const bar1 = {
  _type: 'Bar',
  id: 1,
  name: 'bar',
  idOwner: 1,
};

function testTransform(src: Dto, opts?: TransformDtoOptions): Dto {
  const dst = dtoTransformer.transformDto(src, opts);
  // eslint-disable-next-line no-console
  // console.log({ src, opts, dst });
  return dst;
}

describe('Transform DTO', () => {
  it('Should copy Foo', () => {
    const dst = testTransform({ ...foo1 });
    expect(dst).toBeDefined();
    expect(dst).toHaveProperty('_type');
    expect(dst).not.toHaveProperty('_meta');
    expect(dst).toHaveProperty('id');
    expect(dst).toHaveProperty('name');
    expect(dst).toHaveProperty('createdAt');
    expect(dst).toHaveProperty('qty');
    expect(dst.createdAt).toBeInstanceOf(Date);
    expect(dst.qty).toBe(foo1.qty);
  });

  it('Should copy Bar', () => {
    const dst = testTransform({
      ...bar1,
      owner: { ...foo1 },
    });
    expect(dst).toBeDefined();
    expect(dst).toHaveProperty('_type');
    expect(dst).not.toHaveProperty('_meta');
    expect(dst).toHaveProperty('id');
    expect(dst).toHaveProperty('name');
    expect(dst).toHaveProperty('idOwner');
    expect(dst).toHaveProperty('owner');

    expect(dst.owner).toBeDefined();
    expect(dst.owner).toHaveProperty('_type');
    expect(dst.owner).not.toHaveProperty('_meta');
    expect(dst.owner).toHaveProperty('id');
    expect(dst.owner).toHaveProperty('name');
    expect(dst.owner).toHaveProperty('createdAt');
    expect(dst.owner).toHaveProperty('qty');
    expect(dst.owner.createdAt).toBeInstanceOf(Date);
    expect(dst.owner.qty).toBe(foo1.qty);
  });

  it('Should copy Foo with includes', () => {
    const dst = testTransform(
      { ...foo1 },
      {
        include: 'id,name'.split(','),
      },
    );
    expect(dst).toBeDefined();
    expect(dst).toHaveProperty('_type');
    expect(dst).not.toHaveProperty('_meta');
    expect(dst).toHaveProperty('id');
    expect(dst).toHaveProperty('name');
    expect(dst).not.toHaveProperty('createdAt');
    expect(dst).not.toHaveProperty('qty');
  });
  it('Should copy Foo with excludes', () => {
    const dst = testTransform(
      { ...foo1 },
      {
        exclude: 'qty'.split(','),
      },
    );
    expect(dst).toBeDefined();
    expect(dst).toHaveProperty('_type');
    expect(dst).not.toHaveProperty('_meta');
    expect(dst).toHaveProperty('id');
    expect(dst).toHaveProperty('name');
    expect(dst).toHaveProperty('createdAt');
    expect(dst).not.toHaveProperty('qty');
  });
  it('Should copy Bar with includes', () => {
    const dst = testTransform(
      {
        ...bar1,
        owner: { ...foo1 },
      },
      {
        include: 'id,name'.split(','),
      },
    );
    expect(dst).toBeDefined();
    expect(dst).toHaveProperty('_type');
    expect(dst).not.toHaveProperty('_meta');
    expect(dst).toHaveProperty('id');
    expect(dst).toHaveProperty('name');
    expect(dst).not.toHaveProperty('idOwner');
    expect(dst).not.toHaveProperty('owner');
  });
  it('Should copy Bar with excludes', () => {
    const dst = testTransform(
      {
        ...bar1,
        owner: { ...foo1 },
      },
      {
        exclude: 'idOwner'.split(','),
      },
    );
    expect(dst).toBeDefined();
    expect(dst).toHaveProperty('_type');
    expect(dst).not.toHaveProperty('_meta');
    expect(dst).toHaveProperty('id');
    expect(dst).toHaveProperty('name');
    expect(dst).not.toHaveProperty('idOwner');
    expect(dst).toHaveProperty('owner');
  });
  it('Should copy Bar with child includes', () => {
    const dst = testTransform(
      {
        ...bar1,
        owner: { ...foo1 },
      },
      {
        include: 'owner.id,owner.name'.split(','),
      },
    );
    expect(dst).toBeDefined();
    expect(dst).toHaveProperty('_type');
    expect(dst).not.toHaveProperty('_meta');
    expect(dst).toHaveProperty('id');
    expect(dst).toHaveProperty('name');
    expect(dst).toHaveProperty('idOwner');
    expect(dst).toHaveProperty('owner');
    expect(dst.owner).toBeDefined();
    expect(dst.owner).toHaveProperty('_type');
    expect(dst.owner).not.toHaveProperty('_meta');
    expect(dst.owner).toHaveProperty('id');
    expect(dst.owner).toHaveProperty('name');
    expect(dst.owner).not.toHaveProperty('createdAt');
    expect(dst.owner).not.toHaveProperty('qty');
  });
  it('Should copy Bar with child excludes', () => {
    const dst = testTransform(
      {
        ...bar1,
        owner: { ...foo1 },
      },
      {
        exclude: 'owner.createdAt'.split(','),
      },
    );
    expect(dst).toBeDefined();
    expect(dst).toHaveProperty('_type');
    expect(dst).not.toHaveProperty('_meta');
    expect(dst).toHaveProperty('id');
    expect(dst).toHaveProperty('name');
    expect(dst).toHaveProperty('idOwner');
    expect(dst).toHaveProperty('owner');
    expect(dst.owner).toBeDefined();
    expect(dst.owner).toHaveProperty('_type');
    expect(dst.owner).not.toHaveProperty('_meta');
    expect(dst.owner).toHaveProperty('id');
    expect(dst.owner).toHaveProperty('name');
    expect(dst.owner).not.toHaveProperty('createdAt');
    expect(dst.owner).toHaveProperty('qty');
  });
  // /inventory/lots?page=1&include=id,lot&limit=10
  it('Should copy Bar with meta and a mix includes and excludes', () => {
    const dst = testTransform(
      {
        ...bar1,
        _meta: {
          reqId: 12,
          usrId: 'adminMaster',
        },
        owner: { ...foo1 },
      },
      {
        include: 'id,name,owner'.split(','),
        exclude: 'owner.createdAt'.split(','),
      },
    );
    expect(dst).toBeDefined();
    expect(dst).toHaveProperty('_type');
    expect(dst).toHaveProperty('_meta');
    expect(dst).toHaveProperty('id');
    expect(dst).toHaveProperty('name');
    expect(dst).not.toHaveProperty('idOwner');
    expect(dst).toHaveProperty('owner');
    expect(dst.owner).toBeDefined();
    expect(dst.owner).toHaveProperty('_type');
    expect(dst.owner).not.toHaveProperty('_meta');
    expect(dst.owner).toHaveProperty('id');
    expect(dst.owner).toHaveProperty('name');
    expect(dst.owner).not.toHaveProperty('createdAt');
    expect(dst.owner).toHaveProperty('qty');
  });
}); // describe Transform DTO
