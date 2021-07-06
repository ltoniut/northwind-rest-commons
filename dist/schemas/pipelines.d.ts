export declare type PipeArg = {
    model: Record<string, any>;
    name: string;
    value: any;
};
export declare type PipeFunc = (arg: PipeArg) => void;
export declare type PipeModel = Record<string, PipeFunc>;
export declare class Pipe {
    static pipeField(model: Record<string, any>, name: string, pipes: PipeModel): void;
    static pipeModel(model: Record<string, any>, pipes: PipeModel): void;
    static compose(...pipes: PipeFunc[]): PipeFunc;
    static toString(arg: PipeArg): void;
    static toNumber(arg: PipeArg): void;
    static toDate(arg: PipeArg): void;
    static boolToSomething<T>(trueValue: T, falseValue: T): PipeFunc;
    static trimEnd(arg: PipeArg): void;
    static pipeObject(pipes: PipeModel): PipeFunc;
}
