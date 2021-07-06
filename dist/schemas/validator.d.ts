export declare type ValArg = {
    model: Record<string, any>;
    name: string;
    value: any;
};
export declare type ValFunc = (arg: ValArg) => string;
export declare type ValMsg = string | ValFunc;
export declare type ValResult = {
    valid: boolean;
    errors: {
        [key: string]: string;
    };
};
export interface ValModel {
    [key: string]: ValFunc;
}
export declare class Val {
    readonly model: ValModel;
    constructor(model: ValModel);
    validate(model: Record<string, any>): ValResult;
    static getMessage(arg: ValArg, msg: ValMsg): string;
    static compose(...validators: ValFunc[]): ValFunc;
    static truthy(message?: ValMsg): ValFunc;
    static defined(message?: ValMsg): ValFunc;
    static typeOf(aType: string, message?: ValMsg): ValFunc;
    static range({ min, max, throwNotNumber, }: {
        min?: number;
        max?: number;
        throwNotNumber?: boolean;
    }, message?: ValMsg): ValFunc;
    static anyOf(list: any[], message?: ValMsg): ValFunc;
    static lengthOf({ min, max }: {
        min?: number;
        max?: number;
    }, message?: ValMsg): ValFunc;
    static instanceOf(classType: Function, message?: ValMsg): ValFunc;
}
