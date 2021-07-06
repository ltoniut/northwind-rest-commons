"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoTransformer = void 0;
const model_1 = require("./model");
const debug = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function log(...args) {
    if (!debug)
        return;
    console.log(...args);
}
class DtoTransformer {
    _transformDtoFilterPrefix(prefix, opts) {
        const filter = (n) => prefix ? n.startsWith(prefix) : n.indexOf('.') === -1;
        const map = (n) => n.slice(prefix.length);
        return {
            include: (opts.include || []).filter(filter).map(map),
            exclude: (opts.exclude || []).filter(filter).map(map),
        };
    }
    _transformDtoFilter(name, opts) {
        log('_transformDtoFilter', { name, opts });
        if (opts.exclude &&
            opts.exclude.length > 0 &&
            opts.exclude.indexOf(name) >= 0) {
            return false;
        }
        if (opts.include &&
            opts.include.length > 0 &&
            opts.include.indexOf(name) < 0) {
            return false;
        }
        return true;
    }
    _transformDtoAssign(model, opts, src, dst, field, prefix) {
        log('_transformDtoAssign', {
            model: model.name,
            field,
            value: src[field.fieldName],
        });
        let val = src[field.fieldName];
        if (val === null || val === undefined) {
            return;
        }
        if (model.isProperty(field.fieldName)) {
            if (field.fieldType === 'Date' && val) {
                val = new Date(val);
            }
            dst[field.fieldName] = val;
            return;
        }
        if (model.isType(field.fieldName, 'array') && Array.isArray(val)) {
            // copy array
            dst[field.fieldName] = [...val];
            return;
        }
        prefix = `${prefix}${field.fieldName}.`;
        if (model.isType(field.fieldName, 'relationArray') && Array.isArray(val)) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            dst[field.fieldName] = this.transformDtos(field.fkType || '', val, opts, prefix);
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (!val._type)
            val._type = field.fkType;
        dst[field.fieldName] = this.transformDto(val, opts, prefix);
    }
    transformDto(src, opts = {}, prefix = '') {
        if (!src._type) {
            throw new Error('_type field is not defined');
        }
        const model = model_1.Model.getModel(src._type);
        if (!model) {
            throw new Error(`Model '${src._type}' not defined`);
        }
        const dst = {
            _type: src._type,
        };
        if (src._meta) {
            dst._meta = Object.assign({}, src._meta);
        }
        const localOpts = this._transformDtoFilterPrefix(prefix, opts);
        log({ opts, localOpts, prefix, fields: Object.keys(model.fields) });
        Object.values(model.fields)
            .filter(f => this._transformDtoFilter(f.fieldName, localOpts))
            .forEach(f => this._transformDtoAssign(model, opts, src, dst, f, prefix));
        return dst;
    }
    transformDtos(type, list, opts = {}, prefix = '') {
        const model = model_1.Model.getModel(type);
        if (!model) {
            throw new Error(`Model '${type}' not defined`);
        }
        const localOpts = this._transformDtoFilterPrefix(prefix, opts);
        const fields = Object.values(model.fields).filter(f => this._transformDtoFilter(f.fieldName, localOpts));
        return list.map(src => {
            const dst = { _type: type };
            if (src._meta) {
                dst._meta = Object.assign({}, src._meta);
            }
            src._type = type;
            fields.forEach(f => this._transformDtoAssign(model, opts, src, dst, f, prefix));
            return dst;
        });
    }
}
exports.DtoTransformer = DtoTransformer;
exports.default = new DtoTransformer();
//# sourceMappingURL=transform-dto.js.map