"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipe = void 0;
class Pipe {
    static pipeField(model, name, pipes) {
        if (name in pipes) {
            const arg = { model, name, value: model[name] };
            pipes[name](arg);
            model[name] = arg.value;
        }
    }
    static pipeModel(model, pipes) {
        Object.entries(pipes).forEach(([key, pipe]) => {
            if (!(key in model))
                return;
            const arg = { model, name: key, value: model[key] };
            pipe(arg);
            model[key] = arg.value;
        });
    }
    static compose(...pipes) {
        return arg => {
            pipes.forEach(pipe => pipe(arg));
        };
    }
    static toString(arg) {
        if (typeof arg.value === undefined)
            return;
        arg.value = `${arg.value}`;
    }
    static toNumber(arg) {
        if (typeof arg.value === undefined)
            return;
        try {
            arg.value = Number(arg.value);
        }
        catch (e) {
            console.log(`Field "${arg.name}" can't be converted to number`, {
                value: arg.value,
            });
        }
    }
    static toDate(arg) {
        if (typeof arg.value === undefined)
            return;
        try {
            arg.value = new Date(arg.value);
        }
        catch (e) {
            console.log(`Field "${arg.name}" can't be converted to Date`, {
                value: arg.value,
            });
        }
    }
    static boolToSomething(trueValue, falseValue) {
        return arg => {
            arg.value = arg.value ? trueValue : falseValue;
        };
    }
    static trimEnd(arg) {
        arg.value = `${arg.value}`.trimEnd();
    }
    static pipeObject(pipes) {
        return arg => {
            const model = arg.value;
            if (model === null || model === undefined || typeof model !== 'object')
                return;
            Pipe.pipeModel(model, pipes);
        };
    }
}
exports.Pipe = Pipe;
//# sourceMappingURL=pipelines.js.map