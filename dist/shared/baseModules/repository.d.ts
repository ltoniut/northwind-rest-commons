import { Context } from '../dtos/context';
import { PageQuery } from '../dtos/page-query';
import { Page } from '../page';
export interface BaseRepository<TModel> {
    /**
     * Get All Entities fitlered in a page
     * @param filter Filter of the request
     */
    getAll(ctx: Context, filter: PageQuery): Promise<Page<TModel>>;
    /**
     * Get Single entity by ID
     * @param id Id of the entity
     */
    getByID(ctx: Context, id: number): Promise<TModel | undefined>;
    /**
     * Get single entity by Surrogate keys
     * @param skeys Surrogate keys
     */
    getSingle(ctx: Context, skeys: Record<string, string>): Promise<TModel | undefined>;
    /**
     * Get Single entity by ID
     * @param id Id of the entity
     * @param message Message for the potential exception
     */
    getByIDOrThrow(ctx: Context, id: number, message?: string): Promise<TModel>;
    /**
     * Get single entity by Surrogate keys
     * Throws exception if no entity is found
     * @param skeys Surrogate keys
     * @param message Message for the potential exception
     */
    getSingleOrThrow(ctx: Context, skeys: Record<string, string>, message?: string): Promise<TModel>;
    /**
     * Save entity
     * @param entity Entity to be saved
     */
    save(ctx: Context, entity: TModel): Promise<TModel>;
    /**
     * Delete entity by ID
     * @param id Id of entity
     * @returns Affected Rows
     */
    deleteByID(ctx: Context, id: number): Promise<number>;
    /**
     * Delete entities by Surrogate keys
     * @param skeys Surrogate keys
     * @returns Affected Rows
     */
    deleteByCond(ctx: Context, skeys: Record<string, string>): Promise<number>;
    transaction<T>(ctx: Context, fn: () => Promise<T>): Promise<T>;
}
