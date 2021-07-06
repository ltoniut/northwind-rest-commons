import {
  Body,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserContext } from '@src/decorators/User.decorator';
import { BaseController } from '@src/shared/baseModules/controller';
import { BaseService } from '@src/shared/baseModules/service';
import { Context } from '@src/shared/dtos/context';
import { PageQuery, PagePipe } from '@src/shared/dtos/page-query';
import { BaseDTO } from '@src/shared/dtos/base-dto';
import { FieldsQuery } from '@src/shared/dtos/fields-query';
import { FilterQuery } from '@src/shared/dtos/filter-query';
import { GetPaginatedResponseDTO } from '@src/shared/dtos/get-paginated.response.dto';
import { ResponseDTO } from '@src/shared/dtos/response.dto';

interface DisabledEndpoints {
  getAll?: boolean;
  getSingle?: boolean;
  getById?: boolean;
  create?: boolean;
  update?: boolean;
  delete?: boolean;
}

export abstract class BaseControllerImpl implements BaseController {
  constructor(
    readonly service: BaseService,
    readonly controllerPath: string,
    readonly disabled: DisabledEndpoints = {},
  ) {}

  @Get('/')
  getAll(
    @UserContext()
    ctx: Context,
    @Query(PagePipe, ValidationPipe)
    filter?: PageQuery,
  ): Promise<GetPaginatedResponseDTO<BaseDTO>> {
    if (this.disabled.getAll) throw new NotImplementedException();
    filter.baseUrl = `/${this.controllerPath}`;
    return this.service.getAll(ctx, filter);
  }

  @Get('/single/')
  getSingle(
    @UserContext()
    ctx: Context,
    @Query(ValidationPipe)
    filter: FilterQuery,
  ): Promise<ResponseDTO<BaseDTO>> {
    if (this.disabled.getSingle) throw new NotImplementedException();
    return this.service.getSingle(ctx, filter);
  }

  @Get('/:id')
  getById(
    @UserContext()
    ctx: Context,
    @Param('id')
    id: number,
    @Query(ValidationPipe)
    fields: FieldsQuery,
  ): Promise<ResponseDTO<BaseDTO>> {
    if (this.disabled.getById) throw new NotImplementedException();
    return this.service.getById(ctx, id, fields);
  }

  @Post('/')
  create(
    @UserContext()
    ctx: Context,
    @Query(ValidationPipe)
    fields: FieldsQuery,
    @Body(ValidationPipe)
    body: BaseDTO,
  ): Promise<ResponseDTO<BaseDTO>> {
    if (this.disabled.create) throw new NotImplementedException();
    return this.service.create(ctx, fields, body);
  }

  @Patch('/:id')
  update(
    @UserContext()
    ctx: Context,
    @Param('id')
    id: number,
    @Query(ValidationPipe)
    fields: FieldsQuery,
    @Body(ValidationPipe)
    body: BaseDTO,
  ): Promise<ResponseDTO<BaseDTO>> {
    if (this.disabled.update) throw new NotImplementedException();
    return this.service.update(ctx, id, fields, body);
  }

  @Delete('/:id')
  delete(
    @UserContext()
    ctx: Context,
    @Param('id')
    id: number,
  ): Promise<void> {
    if (this.disabled.delete) throw new NotImplementedException();
    return this.service.delete(ctx, id);
  }
}
