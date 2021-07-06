import { Context } from '../dtos/context';
import { PageQuery } from '../dtos/page-query';
import { Page } from '../page';
import { EntityManager, EntityTarget, FindManyOptions, FindOneOptions } from 'typeorm';
import { BaseRepository } from './repository';
declare type RepositoryRelation = {
    clazz: EntityTarget<any>;
    fk: Record<string, string>;
};
declare type RepositoryRelations = {
    [key: string]: true | RepositoryRelation;
};
export declare class TypeORMRepository<TModel> implements BaseRepository<TModel> {
    readonly entityClass: EntityTarget<TModel>;
    readonly sortFields: string[];
    readonly filterFields: string[];
    readonly manager: EntityManager;
    readonly relations: RepositoryRelations;
    constructor(entityClass: EntityTarget<TModel>, sortFields: string[], filterFields: string[], manager: EntityManager, relations?: RepositoryRelations);
    transaction<T>(ctx: Context, fn: () => Promise<T>): Promise<T>;
    ctxManager(ctx: Context): EntityManager;
    getAll(ctx: Context, filter: PageQuery): Promise<Page<TModel>>;
    getByID(ctx: Context, id: number): Promise<TModel | undefined>;
    getSingle(ctx: Context, skeys: Record<string, string>): Promise<TModel | undefined>;
    getByIDOrThrow(ctx: Context, id: number, message?: string): Promise<TModel>;
    getSingleOrThrow(ctx: Context, skeys: Record<string, string>, message?: string): Promise<TModel>;
    save(ctx: Context, entity: TModel): Promise<TModel>;
    deleteByID(ctx: Context, id: number): Promise<number>;
    deleteByCond(ctx: Context, skeys: Record<string, string>): Promise<number>;
    extendsCheckFilterKeys(filterValues: Record<string, string>): void;
    extendGetAllSortFields(ctx: Context, options: FindManyOptions<TModel>, sortField: string, sortDir: string): void;
    extendFilterValues(ctx: Context, options: FindManyOptions<TModel>, filterValues: Record<string, string>): void;
    extendGetAllFilterValues(ctx: Context, options: FindManyOptions<TModel>, filterValues: Record<string, string>): void;
    extendGetSingleFilterValues(ctx: Context, options: FindManyOptions<TModel>, filterValues: Record<string, string>): void;
    extendAppendRelationOptions(ctx: Context, options: FindOneOptions<TModel>, includeAll?: boolean): void;
    extendAppendRelationEntities(ctx: Context, list: TModel[]): Promise<void>;
    safe(value: string): string;
}
export {};
