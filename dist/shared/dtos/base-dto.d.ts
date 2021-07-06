export declare class BaseDTO {
    _type: string;
    _meta?: Record<string, string>;
}
export interface IBaseDTO {
    _type: string;
    _meta?: Record<string, string>;
    [key: string]: any;
}
