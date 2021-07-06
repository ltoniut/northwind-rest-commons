import { BaseDTO } from '@src/shared/dtos/base-dto';
import { Context } from '@src/shared/dtos/context';
import { FieldsQuery } from '@src/shared/dtos/fields-query';
import { FilterQuery } from '@src/shared/dtos/filter-query';
import { PageQuery } from '@src/shared/dtos/page-query';
import { GetPaginatedResponseDTO } from '@src/shared/dtos/get-paginated.response.dto';
import { ResponseDTO } from '@src/shared/dtos/response.dto';

export interface BaseService {
  getAll(
    ctx: Context,
    filter: PageQuery,
  ): Promise<GetPaginatedResponseDTO<BaseDTO>>;

  getById(
    ctx: Context,
    id: number,
    fields: FieldsQuery,
  ): Promise<ResponseDTO<BaseDTO>>;

  getSingle(ctx: Context, filter: FilterQuery): Promise<ResponseDTO<BaseDTO>>;

  create(
    ctx: Context,
    fields: FieldsQuery,
    body: BaseDTO,
  ): Promise<ResponseDTO<BaseDTO>>;

  update(
    ctx: Context,
    id: number,
    fields: FieldsQuery,
    body: BaseDTO,
  ): Promise<ResponseDTO<BaseDTO>>;

  delete(ctx: Context, id: number): Promise<void>;
}
