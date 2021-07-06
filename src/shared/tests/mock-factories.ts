/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export function mockManager(
  overrides: Record<string, any> = {},
): () => Record<string, any> {
  return () => ({
    transaction: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    ...overrides,
  });
}

export function mockRepository(
  overrides: Record<string, any> = {},
): () => Record<string, any> {
  return () => ({
    getAll: jest.fn(),
    getByID: jest.fn(),
    getSingle: jest.fn(),
    getByIDOrThrow: jest.fn(),
    getSingleOrThrow: jest.fn(),
    save: jest.fn(),
    deleteByID: jest.fn(),
    deleteByCond: jest.fn(),
    transaction: jest.fn(),
    ...overrides,
  });
}

export function mockService(
  overrides: Record<string, any> = {},
): () => Record<string, any> {
  return () => ({
    getAll: jest.fn(),
    getById: jest.fn(),
    getSingle: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    ...overrides,
  });
}
