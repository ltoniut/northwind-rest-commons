import { IsOptional, IsString } from 'class-validator';
import { BaseDTO } from './base-dto';
import dtoTransformer from '@src/schemas/transform-dto';

export class FieldsQuery {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(src: Record<string, any> = {}) {
    Object.assign(this, src);
  }

  @IsOptional()
  @IsString()
  include?: string;

  @IsOptional()
  @IsString()
  exclude?: string;

  transformSingle(src: BaseDTO): BaseDTO {
    return dtoTransformer.transformDto(src, {
      include: this.include ? this.include.split(',') : undefined,
      exclude: this.exclude ? this.exclude.split(',') : undefined,
    });
  }

  transformAll(typeName: string, list: BaseDTO[]): BaseDTO[] {
    return dtoTransformer.transformDtos(typeName, list, {
      include: this.include ? this.include.split(',') : undefined,
      exclude: this.exclude ? this.exclude.split(',') : undefined,
    });
  }
}
