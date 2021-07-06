import { BaseDTO } from '../dtos/base-dto';
import { Context } from '../dtos/context';
import { FieldsQuery } from '../dtos/fields-query';
import { FilterQuery } from '../dtos/filter-query';
import { PageQuery } from '../dtos/page-query';
import { GetPaginatedResponseDTO } from '../dtos/get-paginated.response.dto';
import { ResponseDTO } from '../dtos/response.dto';
export interface BaseController {
    getAll(ctx: Context, filter?: PageQuery): Promise<GetPaginatedResponseDTO<BaseDTO>>;
    getById(ctx: Context, id: number, fields: FieldsQuery): Promise<ResponseDTO<BaseDTO>>;
    getSingle(ctx: Context, filter: FilterQuery): Promise<ResponseDTO<BaseDTO>>;
    create(ctx: Context, fields: FieldsQuery, body: BaseDTO): Promise<ResponseDTO<BaseDTO>>;
    update(ctx: Context, id: number, fields: FieldsQuery, body: BaseDTO): Promise<ResponseDTO<BaseDTO>>;
    delete(ctx: Context, id: number): Promise<void>;
}
