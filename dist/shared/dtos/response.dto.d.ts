import { iResponseDTO } from '../interfaces/base/_dtos/response.dto';
export declare class ResponseDTO<T> implements iResponseDTO<T> {
    /**
     * List or single item
     */
    data: T;
    /**
     * Metadata Object
     */
    meta?: object;
    /**
     * @param data List or single item
     * @param meta Metadata
     */
    constructor(data: T, meta?: object);
}
