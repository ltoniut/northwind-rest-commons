/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from '@src/schemas/model';
import { Pipe, PipeModel } from '@src/schemas/pipelines';
import { pipeModel } from '@src/schemas/pipelines-dto';
import { validationModel } from '@src/schemas/validate-dto';
import { Val, ValModel } from '@src/schemas/validator';
import { BaseDTO } from '@src/shared/dtos/base-dto';
import { Context } from '@src/shared/dtos/context';
import { FieldsQuery } from '@src/shared/dtos/fields-query';
import { FilterQuery } from '@src/shared/dtos/filter-query';
import { PageQuery } from '@src/shared/dtos/page-query';
import { GetPaginatedResponseDTO } from '@src/shared/dtos/get-paginated.response.dto';
import { ResponseDTO } from '@src/shared/dtos/response.dto';
import { Page } from '@src/shared/page';
import { BaseRepository } from './repository';
import { BaseService } from './service';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

export class BaseServiceImpl<TModel, TRepository extends BaseRepository<TModel>>
  implements BaseService {
  constructor(readonly typeName: string, readonly repository: TRepository) {
    this.model = Model.getModel(typeName);
    this.createVal = new Val(this.extendCreateValidator());
    this.createPipe = this.extendCreatePipeline();
    this.updateVal = new Val(this.extendUpdateValidator());
    this.updatePipe = this.extendUpdatePipeline();
    this.responsePipe = this.extendResponsePipeline();
  }
  readonly model: Model;
  readonly responsePipe: PipeModel;
  readonly createVal: Val;
  readonly createPipe: PipeModel;
  readonly updateVal: Val;
  readonly updatePipe: PipeModel;

  async getAll(
    ctx: Context,
    filter: PageQuery,
  ): Promise<GetPaginatedResponseDTO<BaseDTO>> {
    const page = await this.repository.getAll(ctx, filter);
    this.extendGetAllPostFetch(ctx, page);
    const { count } = page;
    const { list, meta } = this.extendGetAllResponse(ctx, filter, page);
    return new GetPaginatedResponseDTO(list as BaseDTO[], filter, count, meta);
  }

  async getById(
    ctx: Context,
    id: number,
    fields: FieldsQuery,
  ): Promise<ResponseDTO<BaseDTO>> {
    const entity = await this.repository.getByID(ctx, id);
    if (!entity) {
      throw new NotFoundException();
    }
    this.extendGetEntityPostFetch(ctx, entity);
    const dto = this.extendGetSingleResponse(ctx, fields, entity);
    return new ResponseDTO((dto as unknown) as BaseDTO);
  }

  async getSingle(
    ctx: Context,
    filter: FilterQuery,
  ): Promise<ResponseDTO<BaseDTO>> {
    const entity = await this.repository.getSingle(ctx, filter.filterValues());
    if (!entity) {
      throw new NotFoundException();
    }
    this.extendGetEntityPostFetch(ctx, entity);
    const dto = this.extendGetSingleResponse(ctx, filter, entity);
    return new ResponseDTO((dto as unknown) as BaseDTO);
  }

  async create(
    ctx: Context,
    fields: FieldsQuery,
    body: BaseDTO,
  ): Promise<ResponseDTO<BaseDTO>> {
    return this.repository.transaction(ctx, async () => {
      const src = await this.extendCreatePrepare(ctx, body);
      const entity = await this.repository.save(ctx, src);
      await this.extendCreatePostSave(ctx, entity);
      const dto = this.extendCreateResponse(ctx, fields, entity);
      return new ResponseDTO((dto as unknown) as BaseDTO);
    });
  }

  async update(
    ctx: Context,
    id: number,
    fields: FieldsQuery,
    body: BaseDTO,
  ): Promise<ResponseDTO<BaseDTO>> {
    return this.repository.transaction(ctx, async () => {
      const src = await this.extendUpdatePrepare(ctx, id, body);
      const entity = await this.repository.save(ctx, src);
      await this.extendUpdatePostSave(ctx, entity);
      const dto = this.extendUpdateResponse(ctx, fields, entity);
      return new ResponseDTO((dto as unknown) as BaseDTO);
    });
  }

  async delete(ctx: Context, id: number): Promise<void> {
    return this.repository.transaction(ctx, async () => {
      await this.repository.deleteByID(ctx, id);
    });
  }

  extendResponsePipeline(): PipeModel {
    const pipes = pipeModel(this.model);
    Object.values(this.model.fields)
      .filter(f => !this.model.isFieldProperty(f))
      .forEach(f => {
        pipes[f.fieldName] = Pipe.pipeObject(
          pipeModel(Model.getModel(f.fkType)),
        );
      });
    return pipes;
  }

  extendGetAllPostFetch(ctx: Context, page: Page<TModel>): void {}

  extendGetAllResponse(
    ctx: Context,
    filter: PageQuery,
    page: Page<TModel>,
  ): { list: BaseDTO[]; meta?: Record<string, any> } {
    const list = filter
      .transformAll(
        this.typeName,
        page.list.map(r => ({ _type: this.typeName, ...r })),
      )
      .map(src => {
        const dst = { ...src };
        Pipe.pipeModel(dst, this.responsePipe);
        return dst;
      });
    return { list };
  }

  extendGetEntityPostFetch(ctx: Context, entity: TModel): void {}

  extendGetSingleResponse(
    ctx: Context,
    fields: FieldsQuery,
    entity: TModel,
  ): BaseDTO {
    const body = fields.transformSingle({
      _type: this.typeName,
      ...entity,
    });
    Pipe.pipeModel(body, this.responsePipe);
    return body;
  }

  extendValPipe(val: Val, pipe: PipeModel, body: BaseDTO): void {
    if (!body._type) body._type = this.typeName;
    Pipe.pipeModel(body, pipe);
    const err = val.validate(body);
    if (err.valid) return;
    const errors = Object.values(err.errors);
    throw new BadRequestException(errors.length === 1 ? errors[0] : errors);
  }
  extendCreateValidator(): ValModel {
    return validationModel(this.model);
  }
  extendCreatePipeline(): PipeModel {
    return pipeModel(this.model);
  }
  async extendCreatePrepare(ctx: Context, body: BaseDTO): Promise<TModel> {
    this.extendValPipe(this.createVal, this.createPipe, body);
    return (body as unknown) as TModel;
  }

  async extendCreatePostSave(ctx: Context, entity: TModel): Promise<void> {}

  extendCreateResponse(
    ctx: Context,
    fields: FieldsQuery,
    entity: TModel,
  ): BaseDTO {
    return fields.transformSingle({
      _type: this.typeName,
      ...entity,
    });
  }

  extendUpdateValidator(): ValModel {
    return validationModel(this.model);
  }
  extendUpdatePipeline(): PipeModel {
    return pipeModel(this.model);
  }

  async extendUpdatePrepare(
    ctx: Context,
    id: number,
    body: BaseDTO,
  ): Promise<TModel> {
    this.extendValPipe(this.updateVal, this.updatePipe, body);
    const src = await this.repository.getByID(ctx, id);
    if (!src) {
      throw new NotFoundException();
    }
    return { ...src, ...body };
  }

  async extendUpdatePostSave(ctx: Context, entity: TModel): Promise<void> {}

  extendUpdateResponse(
    ctx: Context,
    fields: FieldsQuery,
    entity: TModel,
  ): BaseDTO {
    return fields.transformSingle({
      _type: this.typeName,
      ...entity,
    });
  }
}
