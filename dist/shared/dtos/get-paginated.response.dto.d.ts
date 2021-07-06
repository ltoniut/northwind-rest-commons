import { PageQuery } from './page-query';
import { ResponseDTO } from './response.dto';
interface TLinks {
    self: string;
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}
export declare const DefaultPageLimit = 20;
export declare class GetPaginatedResponseDTO<T> extends ResponseDTO<T[]> {
    /**
     * Page Links
     */
    links: TLinks;
    /**
     * Meta Object
     */
    meta?: object;
    /**
     * Current page
     */
    page: number;
    /**
     * Limit of number by page
     */
    limit: number;
    /**
     * Total record on the database
     */
    count: number;
    /**
     * Number of pages
     */
    pages: number;
    /**
     * Page
     * @param list List of Items
     * @param filter GetFilterDTO
     * @param count Total Record Count
     * @param meta Metadata
     */
    constructor(list: T[], filter: PageQuery, count: number, meta?: object);
    mountLinks(filter: PageQuery): void;
    mountUrl(baseUrl: string, search: URLSearchParams, keys: Record<string, any>): string;
    mountMeta(meta: object | undefined): void;
}
export {};
