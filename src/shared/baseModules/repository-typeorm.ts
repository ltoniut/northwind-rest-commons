/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { distinctIds } from '@src/helpers/repository';
import { Context } from '@src/shared/dtos/context';
import { PageQuery } from '@src/shared/dtos/page-query';
import { Page } from '@src/shared/page';
import {
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  In,
  Like,
} from 'typeorm';
import { BaseRepository } from './repository';

type RepositoryRelation = {
  clazz: EntityTarget<any>;
  fk: Record<string, string>;
};
type RepositoryRelations = {
  [key: string]: true | RepositoryRelation;
};

export class TypeORMRepository<TModel> implements BaseRepository<TModel> {
  constructor(
    readonly entityClass: EntityTarget<TModel>,
    readonly sortFields: string[],
    readonly filterFields: string[],
    readonly manager: EntityManager,
    readonly relations: RepositoryRelations = {},
  ) {}

  async transaction<T>(ctx: Context, fn: () => Promise<T>): Promise<T> {
    if (!process.env.ENABLE_TRANSACTION) {
      return fn();
    }
    try {
      const resp = await this.manager.transaction(manager => {
        ctx.meta.tx = manager;
        return fn();
      });
      delete ctx.meta.tx;
      return resp;
    } catch (e) {
      delete ctx.meta.tx;
      throw e;
    }
  }

  ctxManager(ctx: Context): EntityManager {
    if (ctx.meta.tx) {
      return ctx.meta.tx as EntityManager;
    }
    return this.manager;
  }

  async getAll(ctx: Context, filter: PageQuery): Promise<Page<TModel>> {
    const manager = this.ctxManager(ctx);
    const { limit, offset, sortDir, sortField } = filter.pageDTO;
    const filterValues = filter.filterValues();
    const options: FindManyOptions<TModel> = {
      skip: offset,
      take: limit,
    };

    if (sortField && !this.sortFields.includes(sortField)) {
      throw new BadRequestException(`Invalid Sort field "${sortField}"`);
    }
    if (sortField) {
      this.extendGetAllSortFields(ctx, options, sortField, sortDir);
    }

    this.extendsCheckFilterKeys(filterValues);
    this.extendAppendRelationOptions(ctx, options);
    this.extendGetAllFilterValues(ctx, options, filterValues);

    const [list, count] = await manager.findAndCount(this.entityClass, options);

    this.extendAppendRelationEntities(ctx, list);

    return { list, count };
  }

  async getByID(ctx: Context, id: number): Promise<TModel | undefined> {
    const manager = this.ctxManager(ctx);
    const options: FindOneOptions<TModel> = {};
    this.extendAppendRelationOptions(ctx, options, true);
    return manager.findOne(this.entityClass, id);
  }

  async getSingle(
    ctx: Context,
    skeys: Record<string, string>,
  ): Promise<TModel | undefined> {
    const manager = this.ctxManager(ctx);
    this.extendsCheckFilterKeys(skeys);
    const options: FindOneOptions<TModel> = {};
    this.extendAppendRelationOptions(ctx, options, true);
    this.extendGetSingleFilterValues(ctx, options, skeys);
    return manager.findOne(this.entityClass, options);
  }

  async getByIDOrThrow(
    ctx: Context,
    id: number,
    message?: string,
  ): Promise<TModel> {
    const manager = this.ctxManager(ctx);
    const options: FindOneOptions<TModel> = {};
    this.extendAppendRelationOptions(ctx, options, true);
    const result = await manager.findOne(this.entityClass, id);
    if (!result) {
      throw new NotFoundException(message);
    }
    return result;
  }

  async getSingleOrThrow(
    ctx: Context,
    skeys: Record<string, string>,
    message?: string,
  ): Promise<TModel> {
    const manager = this.ctxManager(ctx);
    this.extendsCheckFilterKeys(skeys);
    const options: FindOneOptions<TModel> = {
      where: skeys,
    };
    this.extendAppendRelationOptions(ctx, options, true);
    const result = await manager.findOne(this.entityClass, options);
    if (!result) {
      throw new NotFoundException(message);
    }
    return result;
  }

  async save(ctx: Context, entity: TModel): Promise<TModel> {
    const manager = this.ctxManager(ctx);
    return manager.save(this.entityClass, entity);
  }

  async deleteByID(ctx: Context, id: number): Promise<number> {
    const manager = this.ctxManager(ctx);
    const res = await manager.delete(this.entityClass, id);
    return res.affected || 0;
  }

  async deleteByCond(
    ctx: Context,
    skeys: Record<string, string>,
  ): Promise<number> {
    const manager = this.ctxManager(ctx);
    const res = await manager.delete(this.entityClass, skeys);
    return res.affected || 0;
  }

  extendsCheckFilterKeys(filterValues: Record<string, string>): void {
    const invalidFilterKeys = Object.keys(filterValues).filter(
      key => !this.filterFields.includes(key),
    );
    if (invalidFilterKeys.length) {
      throw new BadRequestException(
        `Invalid Filter field${
          invalidFilterKeys.length > 1 ? 's' : ''
        } "${invalidFilterKeys.join(', ')}"`,
      );
    }
  }

  extendGetAllSortFields(
    ctx: Context,
    options: FindManyOptions<TModel>,
    sortField: string,
    sortDir: string,
  ): void {
    options.order = { [sortField]: sortDir } as {
      [P in keyof TModel]?: 1 | 'ASC' | 'DESC' | -1 | undefined;
    };
  }

  extendFilterValues(
    ctx: Context,
    options: FindManyOptions<TModel>,
    filterValues: Record<string, string>,
  ): void {
    if (Object.keys(filterValues).length === 0) {
      return;
    }
    const where = {};
    Object.entries(filterValues).forEach(([key, val]) => {
      if (val.includes('*')) {
        where[key] = Like(val.replace(/[*]/g, '%'));
      } else {
        where[key] = val;
      }
    });
    options.where = where;
  }

  extendGetAllFilterValues(
    ctx: Context,
    options: FindManyOptions<TModel>,
    filterValues: Record<string, string>,
  ): void {
    this.extendFilterValues(ctx, options, filterValues);
  }

  extendGetSingleFilterValues(
    ctx: Context,
    options: FindManyOptions<TModel>,
    filterValues: Record<string, string>,
  ): void {
    this.extendFilterValues(ctx, options, filterValues);
  }

  extendAppendRelationOptions(
    ctx: Context,
    options: FindOneOptions<TModel>,
    includeAll = false,
  ): void {
    const rKeys = Object.keys(this.relations).filter(
      key => includeAll || typeof this.relations[key] === 'boolean',
    );
    if (rKeys.length) {
      options.relations = rKeys;
    }
  }

  async extendAppendRelationEntities(
    ctx: Context,
    list: TModel[],
  ): Promise<void> {
    const manager = this.ctxManager(ctx);
    const relations = Object.entries(this.relations)
      .map(([key, val]) => ({ key, val }))
      .filter(itm => typeof itm.val === 'object')
      .map(itm => ({ key: itm.key, val: itm.val as RepositoryRelation }));
    if (relations.length === 0) {
      return;
    }
    // Calculate distinct ids
    const ids: Record<string, string[]> = {};
    relations.forEach(rel => {
      Object.entries(rel.val.fk)
        .map(([key, val]) => ({ key, val }))
        .forEach(itm => {
          if (itm.key in ids) {
            return;
          }
          ids[itm.key] = distinctIds(list, row => row[itm.key]);
        });
    });

    // Fetch relations
    const relObjs: Record<string, any[]> = {};
    // eslint-disable-next-line no-plusplus
    for (let k = 0, n = relations.length; k < n; k++) {
      const rel = relations[k];
      const where = {};
      const oWhere = {};
      const opts: FindManyOptions<any> = { where: oWhere };
      Object.entries(rel.val.fk)
        .map(([key, val]) => ({ key, val }))
        .forEach(itm => {
          where[itm.val] = ids[itm.key];
        });
      if (
        Object.values(where).find(
          itm => Array.isArray(itm) && itm.length === 0,
        ) !== null
      ) {
        // a foreign key has no values, continue
        // eslint-disable-next-line no-continue
        continue;
      }
      Object.entries(where)
        .map(([key, val]) => ({ key, val }))
        .forEach(itm => {
          oWhere[itm.key] = In(itm.val as string[]);
        });
      // eslint-disable-next-line no-await-in-loop
      const entities = await manager.find(rel.val.clazz, opts);
      relObjs[rel.key] = entities;
    }

    // Assign relations to rows
    list.forEach(row => {
      relations.forEach(rel => {
        const relList = relObjs[rel.key] || [];
        row[rel.key] = relList.find(obj => {
          const fks = Object.entries(rel.val.fk).map(([key, val]) => ({
            key,
            val,
          }));
          return (
            fks.length ===
            fks.filter(itm => relList.find(r => r[itm.val] === obj[itm.val]))
              .length
          );
        });
      });
    });
  }

  safe(value: string): string {
    // eslint-disable-next-line no-control-regex
    return value.replace(/[\0\n\r\b\t\\'"\x1a]/g, function (s) {
      switch (s) {
        case '\0':
          return '\\0';
        case '\n':
          return '\\n';
        case '\r':
          return '\\r';
        case '\b':
          return '\\b';
        case '\t':
          return '\\t';
        case '\x1a':
          return '\\Z';
        case "'":
          return "''";
        case '"':
          return '""';
        default:
          return '\\' + s;
      }
    });
  }
}
