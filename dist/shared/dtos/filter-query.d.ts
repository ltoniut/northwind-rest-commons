import { FieldsQuery as FieldsQuery } from './fields-query';
export declare class FilterQuery extends FieldsQuery {
    constructor(src?: Record<string, any>);
    filterKeys?: string;
    filterVals?: string;
    filterValues(): Record<string, string>;
    setFilterValues(value: Record<string, string>): void;
}
