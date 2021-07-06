import { Request } from 'express';
export declare class Context {
    constructor(src?: any);
    req: Request;
    userId: number;
    finitials: string;
    fname: string;
    fmenu: string;
    flevel: number;
    email: string;
    meta: Record<string, any>;
    get gc_isarc(): string;
    get gl_ofcputflag(): boolean;
}
