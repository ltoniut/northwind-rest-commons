/* eslint-disable @typescript-eslint/no-explicit-any */
export type PipeArg = {
  model: Record<string, any>;
  name: string;
  value: any;
};

export type PipeFunc = (arg: PipeArg) => void;
export type PipeModel = Record<string, PipeFunc>;

export class Pipe {
  static pipeField(
    model: Record<string, any>,
    name: string,
    pipes: PipeModel,
  ): void {
    if (name in pipes) {
      const arg = { model, name, value: model[name] };
      pipes[name](arg);
      model[name] = arg.value;
    }
  }
  static pipeModel(model: Record<string, any>, pipes: PipeModel): void {
    Object.entries(pipes).forEach(([key, pipe]) => {
      if (!(key in model)) return;
      const arg = { model, name: key, value: model[key] };
      pipe(arg);
      model[key] = arg.value;
    });
  }
  static compose(...pipes: PipeFunc[]): PipeFunc {
    return arg => {
      pipes.forEach(pipe => pipe(arg));
    };
  }

  static toString(arg: PipeArg): void {
    if (typeof arg.value === undefined) return;
    arg.value = `${arg.value}`;
  }
  static toNumber(arg: PipeArg): void {
    if (typeof arg.value === undefined) return;
    try {
      arg.value = Number(arg.value);
    } catch (e) {
      console.log(`Field "${arg.name}" can't be converted to number`, {
        value: arg.value,
      });
    }
  }
  static toDate(arg: PipeArg): void {
    if (typeof arg.value === undefined) return;
    try {
      arg.value = new Date(arg.value);
    } catch (e) {
      console.log(`Field "${arg.name}" can't be converted to Date`, {
        value: arg.value,
      });
    }
  }

  static boolToSomething<T>(trueValue: T, falseValue: T): PipeFunc {
    return arg => {
      arg.value = arg.value ? trueValue : falseValue;
    };
  }

  static trimEnd(arg: PipeArg): void {
    arg.value = `${arg.value}`.trimEnd();
  }

  static pipeObject(pipes: PipeModel): PipeFunc {
    return arg => {
      const model = arg.value;
      if (model === null || model === undefined || typeof model !== 'object')
        return;
      Pipe.pipeModel(model as Record<string, any>, pipes);
    };
  }
}
