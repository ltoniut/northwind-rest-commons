"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockService = exports.mockRepository = exports.mockManager = void 0;
function mockManager(overrides = {}) {
    return () => (Object.assign({ transaction: jest.fn(), findAndCount: jest.fn(), findOne: jest.fn(), save: jest.fn(), delete: jest.fn() }, overrides));
}
exports.mockManager = mockManager;
function mockRepository(overrides = {}) {
    return () => (Object.assign({ getAll: jest.fn(), getByID: jest.fn(), getSingle: jest.fn(), getByIDOrThrow: jest.fn(), getSingleOrThrow: jest.fn(), save: jest.fn(), deleteByID: jest.fn(), deleteByCond: jest.fn(), transaction: jest.fn() }, overrides));
}
exports.mockRepository = mockRepository;
function mockService(overrides = {}) {
    return () => (Object.assign({ getAll: jest.fn(), getById: jest.fn(), getSingle: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() }, overrides));
}
exports.mockService = mockService;
//# sourceMappingURL=mock-factories.js.map