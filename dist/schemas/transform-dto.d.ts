import { Dto, Model, Field } from './model';
export interface TransformDtoOptions {
    include?: string[];
    exclude?: string[];
}
export declare class DtoTransformer {
    _transformDtoFilterPrefix(prefix: string, opts: TransformDtoOptions): TransformDtoOptions;
    _transformDtoFilter(name: string, opts: TransformDtoOptions): boolean;
    _transformDtoAssign(model: Model, opts: TransformDtoOptions, src: Dto, dst: Dto, field: Field, prefix: string): void;
    transformDto(src: Dto, opts?: TransformDtoOptions, prefix?: string): Dto;
    transformDtos(type: string, list: Dto[], opts?: TransformDtoOptions, prefix?: string): Dto[];
}
declare const _default: DtoTransformer;
export default _default;
