import { IsOptional, IsString } from 'class-validator';
import { FieldsQuery as FieldsQuery } from './fields-query';

export class FilterQuery extends FieldsQuery {
  constructor(src: Record<string, any> = {}) {
    super(src);
  }

  @IsOptional()
  @IsString()
  filterKeys?: string;

  @IsOptional()
  @IsString()
  filterVals?: string;

  filterValues(): Record<string, string> {
    const keys = (this.filterKeys || '').split(',').filter(Boolean);
    const vals = (this.filterVals || '').split(',');
    const res: Record<string, string> = {};
    keys.forEach((key, idx) => {
      res[key] = vals[idx] || '';
    });
    return res;
  }

  setFilterValues(value: Record<string, string>): void {
    const keys = Object.keys(value);
    const vals = Object.values(value);
    this.filterKeys = keys.join(',');
    this.filterVals = vals.join(',');
  }
}
