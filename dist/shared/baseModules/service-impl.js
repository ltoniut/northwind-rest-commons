"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseServiceImpl = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const common_1 = require("@nestjs/common");
const model_1 = require("../../schemas/model");
const pipelines_1 = require("../../schemas/pipelines");
const pipelines_dto_1 = require("../../schemas/pipelines-dto");
const validate_dto_1 = require("../../schemas/validate-dto");
const validator_1 = require("../../schemas/validator");
const get_paginated_response_dto_1 = require("../dtos/get-paginated.response.dto");
const response_dto_1 = require("../dtos/response.dto");
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
class BaseServiceImpl {
    constructor(typeName, repository) {
        this.typeName = typeName;
        this.repository = repository;
        this.model = model_1.Model.getModel(typeName);
        this.createVal = new validator_1.Val(this.extendCreateValidator());
        this.createPipe = this.extendCreatePipeline();
        this.updateVal = new validator_1.Val(this.extendUpdateValidator());
        this.updatePipe = this.extendUpdatePipeline();
        this.responsePipe = this.extendResponsePipeline();
    }
    async getAll(ctx, filter) {
        const page = await this.repository.getAll(ctx, filter);
        this.extendGetAllPostFetch(ctx, page);
        const { count } = page;
        const { list, meta } = this.extendGetAllResponse(ctx, filter, page);
        return new get_paginated_response_dto_1.GetPaginatedResponseDTO(list, filter, count, meta);
    }
    async getById(ctx, id, fields) {
        const entity = await this.repository.getByID(ctx, id);
        if (!entity) {
            throw new common_1.NotFoundException();
        }
        this.extendGetEntityPostFetch(ctx, entity);
        const dto = this.extendGetSingleResponse(ctx, fields, entity);
        return new response_dto_1.ResponseDTO(dto);
    }
    async getSingle(ctx, filter) {
        const entity = await this.repository.getSingle(ctx, filter.filterValues());
        if (!entity) {
            throw new common_1.NotFoundException();
        }
        this.extendGetEntityPostFetch(ctx, entity);
        const dto = this.extendGetSingleResponse(ctx, filter, entity);
        return new response_dto_1.ResponseDTO(dto);
    }
    async create(ctx, fields, body) {
        return this.repository.transaction(ctx, async () => {
            try {
                await this.extendCreatePrepare(ctx, body);
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
            const src = await this.extendCreatePrepare(ctx, body);
            const entity = await this.repository.save(ctx, src);
            await this.extendCreatePostSave(ctx, entity);
            const dto = this.extendCreateResponse(ctx, fields, entity);
            return new response_dto_1.ResponseDTO(dto);
        });
    }
    async update(ctx, id, fields, body) {
        return this.repository.transaction(ctx, async () => {
            const src = await this.extendUpdatePrepare(ctx, id, body);
            const entity = await this.repository.save(ctx, src);
            await this.extendUpdatePostSave(ctx, entity);
            const dto = this.extendUpdateResponse(ctx, fields, entity);
            return new response_dto_1.ResponseDTO(dto);
        });
    }
    async delete(ctx, id) {
        return this.repository.transaction(ctx, async () => {
            await this.repository.deleteByID(ctx, id);
        });
    }
    extendResponsePipeline() {
        const pipes = pipelines_dto_1.pipeModel(this.model);
        Object.values(this.model.fields)
            .filter(f => !this.model.isFieldProperty(f))
            .forEach(f => {
            pipes[f.fieldName] = pipelines_1.Pipe.pipeObject(pipelines_dto_1.pipeModel(model_1.Model.getModel(f.fkType)));
        });
        return pipes;
    }
    extendGetAllPostFetch(ctx, page) { }
    extendGetAllResponse(ctx, filter, page) {
        const list = filter
            .transformAll(this.typeName, page.list.map(r => (Object.assign({ _type: this.typeName }, r))))
            .map(src => {
            const dst = Object.assign({}, src);
            pipelines_1.Pipe.pipeModel(dst, this.responsePipe);
            return dst;
        });
        return { list };
    }
    extendGetEntityPostFetch(ctx, entity) { }
    extendGetSingleResponse(ctx, fields, entity) {
        const body = fields.transformSingle(Object.assign({ _type: this.typeName }, entity));
        pipelines_1.Pipe.pipeModel(body, this.responsePipe);
        return body;
    }
    extendValPipe(val, pipe, body) {
        if (!body._type)
            body._type = this.typeName;
        pipelines_1.Pipe.pipeModel(body, pipe);
        const err = val.validate(body);
        if (err.valid)
            return;
        const errors = Object.values(err.errors);
        throw new common_1.BadRequestException(errors.length === 1 ? errors[0] : errors);
    }
    extendCreateValidator() {
        return validate_dto_1.validationModel(this.model);
    }
    extendCreatePipeline() {
        return pipelines_dto_1.pipeModel(this.model);
    }
    async extendCreatePrepare(ctx, body) {
        this.extendValPipe(this.createVal, this.createPipe, body);
        return body;
    }
    async extendCreatePostSave(ctx, entity) { }
    extendCreateResponse(ctx, fields, entity) {
        return fields.transformSingle(Object.assign({ _type: this.typeName }, entity));
    }
    extendUpdateValidator() {
        return validate_dto_1.validationModel(this.model);
    }
    extendUpdatePipeline() {
        return pipelines_dto_1.pipeModel(this.model);
    }
    async extendUpdatePrepare(ctx, id, body) {
        this.extendValPipe(this.updateVal, this.updatePipe, body);
        const src = await this.repository.getByID(ctx, id);
        if (!src) {
            throw new common_1.NotFoundException();
        }
        return Object.assign(Object.assign({}, src), body);
    }
    async extendUpdatePostSave(ctx, entity) { }
    extendUpdateResponse(ctx, fields, entity) {
        return fields.transformSingle(Object.assign({ _type: this.typeName }, entity));
    }
}
exports.BaseServiceImpl = BaseServiceImpl;
//# sourceMappingURL=service-impl.js.map