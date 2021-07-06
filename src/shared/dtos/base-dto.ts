import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class BaseDTO {
  @Expose()
  @IsString()
  _type: string;

  @Expose()
  @IsOptional()
  _meta?: Record<string, string>;
}

export interface IBaseDTO {
  _type: string;
  _meta?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
