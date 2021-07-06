"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMRepository = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const common_1 = require("@nestjs/common");
const repository_1 = require("../../helpers/repository");
const typeorm_1 = require("typeorm");
class TypeORMRepository {
    constructor(entityClass, sortFields, filterFields, manager, relations = {}) {
        this.entityClass = entityClass;
        this.sortFields = sortFields;
        this.filterFields = filterFields;
        this.manager = manager;
        this.relations = relations;
    }
    async transaction(ctx, fn) {
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
        }
        catch (e) {
            delete ctx.meta.tx;
            throw e;
        }
    }
    ctxManager(ctx) {
        if (ctx.meta.tx) {
            return ctx.meta.tx;
        }
        return this.manager;
    }
    async getAll(ctx, filter) {
        const manager = this.ctxManager(ctx);
        const { limit, offset, sortDir, sortField } = filter.pageDTO;
        const filterValues = filter.filterValues();
        const options = {
            skip: offset,
            take: limit,
        };
        if (sortField && !this.sortFields.includes(sortField)) {
            throw new common_1.BadRequestException(`Invalid Sort field "${sortField}"`);
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
    async getByID(ctx, id) {
        const manager = this.ctxManager(ctx);
        const options = {};
        this.extendAppendRelationOptions(ctx, options, true);
        return manager.findOne(this.entityClass, id);
    }
    async getSingle(ctx, skeys) {
        const manager = this.ctxManager(ctx);
        this.extendsCheckFilterKeys(skeys);
        const options = {};
        this.extendAppendRelationOptions(ctx, options, true);
        this.extendGetSingleFilterValues(ctx, options, skeys);
        return manager.findOne(this.entityClass, options);
    }
    async getByIDOrThrow(ctx, id, message) {
        const manager = this.ctxManager(ctx);
        const options = {};
        this.extendAppendRelationOptions(ctx, options, true);
        const result = await manager.findOne(this.entityClass, id);
        if (!result) {
            throw new common_1.NotFoundException(message);
        }
        return result;
    }
    async getSingleOrThrow(ctx, skeys, message) {
        const manager = this.ctxManager(ctx);
        this.extendsCheckFilterKeys(skeys);
        const options = {
            where: skeys,
        };
        this.extendAppendRelationOptions(ctx, options, true);
        const result = await manager.findOne(this.entityClass, options);
        if (!result) {
            throw new common_1.NotFoundException(message);
        }
        return result;
    }
    async save(ctx, entity) {
        const manager = this.ctxManager(ctx);
        return manager.save(this.entityClass, entity);
    }
    async deleteByID(ctx, id) {
        const manager = this.ctxManager(ctx);
        const res = await manager.delete(this.entityClass, id);
        return res.affected || 0;
    }
    async deleteByCond(ctx, skeys) {
        const manager = this.ctxManager(ctx);
        const res = await manager.delete(this.entityClass, skeys);
        return res.affected || 0;
    }
    extendsCheckFilterKeys(filterValues) {
        const invalidFilterKeys = Object.keys(filterValues).filter(key => !this.filterFields.includes(key));
        if (invalidFilterKeys.length) {
            throw new common_1.BadRequestException(`Invalid Filter field${invalidFilterKeys.length > 1 ? 's' : ''} "${invalidFilterKeys.join(', ')}"`);
        }
    }
    extendGetAllSortFields(ctx, options, sortField, sortDir) {
        options.order = { [sortField]: sortDir };
    }
    extendFilterValues(ctx, options, filterValues) {
        if (Object.keys(filterValues).length === 0) {
            return;
        }
        const where = {};
        Object.entries(filterValues).forEach(([key, val]) => {
            if (val.includes('*')) {
                where[key] = typeorm_1.Like(val.replace(/[*]/g, '%'));
            }
            else {
                where[key] = val;
            }
        });
        options.where = where;
    }
    extendGetAllFilterValues(ctx, options, filterValues) {
        this.extendFilterValues(ctx, options, filterValues);
    }
    extendGetSingleFilterValues(ctx, options, filterValues) {
        this.extendFilterValues(ctx, options, filterValues);
    }
    extendAppendRelationOptions(ctx, options, includeAll = false) {
        const rKeys = Object.keys(this.relations).filter(key => includeAll || typeof this.relations[key] === 'boolean');
        if (rKeys.length) {
            options.relations = rKeys;
        }
    }
    async extendAppendRelationEntities(ctx, list) {
        const manager = this.ctxManager(ctx);
        const relations = Object.entries(this.relations)
            .map(([key, val]) => ({ key, val }))
            .filter(itm => typeof itm.val === 'object')
            .map(itm => ({ key: itm.key, val: itm.val }));
        if (relations.length === 0) {
            return;
        }
        // Calculate distinct ids
        const ids = {};
        relations.forEach(rel => {
            Object.entries(rel.val.fk)
                .map(([key, val]) => ({ key, val }))
                .forEach(itm => {
                if (itm.key in ids) {
                    return;
                }
                ids[itm.key] = repository_1.distinctIds(list, row => row[itm.key]);
            });
        });
        // Fetch relations
        const relObjs = {};
        // eslint-disable-next-line no-plusplus
        for (let k = 0, n = relations.length; k < n; k++) {
            const rel = relations[k];
            const where = {};
            const oWhere = {};
            const opts = { where: oWhere };
            Object.entries(rel.val.fk)
                .map(([key, val]) => ({ key, val }))
                .forEach(itm => {
                where[itm.val] = ids[itm.key];
            });
            if (Object.values(where).find(itm => Array.isArray(itm) && itm.length === 0) !== null) {
                // a foreign key has no values, continue
                // eslint-disable-next-line no-continue
                continue;
            }
            Object.entries(where)
                .map(([key, val]) => ({ key, val }))
                .forEach(itm => {
                oWhere[itm.key] = typeorm_1.In(itm.val);
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
                    return (fks.length ===
                        fks.filter(itm => relList.find(r => r[itm.val] === obj[itm.val]))
                            .length);
                });
            });
        });
    }
    safe(value) {
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
exports.TypeORMRepository = TypeORMRepository;
//# sourceMappingURL=repository-typeorm.js.map