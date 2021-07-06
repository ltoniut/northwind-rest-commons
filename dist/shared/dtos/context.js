"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
class Context {
    constructor(src = {}) {
        Object.assign(this, { meta: {} }, src);
        this.flevel = parseInt(src.flevel || '0', 10);
    }
    get gc_isarc() {
        return process.env.GC_ISARC || 'N';
    }
    get gl_ofcputflag() {
        return Boolean(process.env.GL_OFCPUTFLAG);
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map