/// <reference types="jest" />
export declare const mockRepository: () => object;
export declare const mockManager: () => {
    createQueryBuilder: jest.Mock<any, any>;
    select: jest.Mock<any, any>;
    innerJoin: jest.Mock<any, any>;
    where: jest.Mock<any, any>;
    andWhere: jest.Mock<any, any>;
    getRepository: jest.Mock<any, any>;
    findOne: jest.Mock<any, any>;
    save: jest.Mock<any, any>;
    update: jest.Mock<any, any>;
    count: jest.Mock<any, any>;
    insert: jest.Mock<any, any>;
    create: jest.Mock<any, any>;
    find: jest.Mock<any, any>;
    delete: jest.Mock<any, any>;
    query: jest.Mock<any, any>;
    getOne: jest.Mock<any, any>;
    skip: jest.Mock<any, any>;
    take: jest.Mock<any, any>;
    getRawOne: jest.Mock<any, any>;
    transaction: jest.Mock<any, any>;
    connection: jest.Mock<any, any>;
};
