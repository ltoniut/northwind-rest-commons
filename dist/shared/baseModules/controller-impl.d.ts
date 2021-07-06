import { BaseController } from './controller';
import { BaseService } from './service';
import { Context } from '../dtos/context';
import { PageQuery } from '../dtos/page-query';
import { BaseDTO } from '../dtos/base-dto';
import { FieldsQuery } from '../dtos/fields-query';
import { FilterQuery } from '../dtos/filter-query';
import { GetPaginatedResponseDTO } from '../dtos/get-paginated.response.dto';
import { ResponseDTO } from '../dtos/response.dto';
interface DisabledEndpoints {
    getAll?: boolean;
    getSingle?: boolean;
    getById?: boolean;
    create?: boolean;
    update?: boolean;
    delete?: boolean;
}
export declare abstract class BaseControllerImpl implements BaseController {
    readonly service: BaseService;
    readonly controllerPath: string;
    readonly disabled: DisabledEndpoints;
    constructor(service: BaseService, controllerPath: string, disabled?: DisabledEndpoints);
    getAll(ctx: Context, filter?: PageQuery): Promise<GetPaginatedResponseDTO<BaseDTO>>;
    getSingle(ctx: Context, filter: FilterQuery): Promise<ResponseDTO<BaseDTO>>;
    getById(ctx: Context, id: number, fields: FieldsQuery): Promise<ResponseDTO<BaseDTO>>;
    create(ctx: Context, fields: FieldsQuery, body: BaseDTO): Promise<ResponseDTO<BaseDTO>>;
    update(ctx: Context, id: number, fields: FieldsQuery, body: BaseDTO): Promise<ResponseDTO<BaseDTO>>;
    delete(ctx: Context, id: number): Promise<void>;
}
export {};
