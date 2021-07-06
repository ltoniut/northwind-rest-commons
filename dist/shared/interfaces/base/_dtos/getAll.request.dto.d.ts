export declare class GetAllBaseRequestDTO {
    baseUrl?: string;
    page?: number;
    limit?: number;
    sortField?: string;
    sortDir?: 'ASC' | 'DESC';
    clause?: string;
    params?: Array<string>;
}
