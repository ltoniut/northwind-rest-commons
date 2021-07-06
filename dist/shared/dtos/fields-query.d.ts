import { BaseDTO } from './base-dto';
export declare class FieldsQuery {
    constructor(src?: Record<string, any>);
    include?: string;
    exclude?: string;
    transformSingle(src: BaseDTO): BaseDTO;
    transformAll(typeName: string, list: BaseDTO[]): BaseDTO[];
}
