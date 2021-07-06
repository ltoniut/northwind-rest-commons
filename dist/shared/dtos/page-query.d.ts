import { PipeTransform } from '@nestjs/common';
import { FilterQuery } from './filter-query';
export declare const GetPageDTOLimit = 20;
export interface IPageQuery {
    baseUrl: string;
    offset: number;
    limit: number;
    sortField: string;
    sortDir: 'ASC' | 'DESC';
}
export declare class PagePipe implements PipeTransform<any> {
    transform(src: any): PageQuery;
}
export declare class PageQuery extends FilterQuery {
    constructor(src?: Record<string, any>);
    baseUrl?: string;
    page?: number;
    limit?: number;
    sort?: string;
    get pageDTO(): IPageQuery;
    sortAsc(): boolean;
    sortField(): string;
}
