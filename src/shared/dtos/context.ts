/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';

export class Context {
  constructor(src: any = {}) {
    Object.assign(this, { meta: {} }, src);
    this.flevel = parseInt(src.flevel || '0', 10);
  }

  req: Request;

  userId: number;

  finitials: string;

  fname: string;

  fmenu: string;

  flevel: number;

  email: string;

  meta: Record<string, any>;

  get gc_isarc(): string {
    return process.env.GC_ISARC || 'N';
  }

  get gl_ofcputflag(): boolean {
    return Boolean(process.env.GL_OFCPUTFLAG);
  }
}
