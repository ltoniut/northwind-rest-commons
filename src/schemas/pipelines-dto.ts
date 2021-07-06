import { Field, Model } from './model';
import { Pipe, PipeFunc, PipeModel } from './pipelines';

function _pipeField(model: Model, field: Field): PipeFunc | undefined {
  const res: PipeFunc[] = [];
  switch (field.fieldType) {
    case 'Date':
      res.push(Pipe.toDate);
      break;
    case 'string':
      res.push(Pipe.trimEnd);
      break;
  }

  if (res.length === 0) return undefined;
  if (res.length === 1) return res[0];
  return Pipe.compose(...res);
}

export function pipeModel(model: Model): PipeModel {
  const res: PipeModel = {};
  Object.values(model.fields)
    .filter(f => model.isFieldProperty(f))
    .forEach(f => {
      const val = _pipeField(model, f);
      if (val) res[f.fieldName] = val;
    });
  return res;
}
