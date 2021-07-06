import { IsObject } from 'class-validator';
import { iResponseDTO } from '@src/shared/interfaces/base/_dtos/response.dto';

export class ResponseDTO<T> implements iResponseDTO<T> {
  /**
   * List or single item
   */
  @IsObject()
  data: T;

  /**
   * Metadata Object
   */
  @IsObject()
  meta?: object;

  /**
   * @param data List or single item
   * @param meta Metadata
   */
  constructor(data: T, meta?: object) {
    this.data = data;
    this.meta = meta;
  }
}
