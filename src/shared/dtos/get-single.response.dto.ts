import { IsObject } from 'class-validator';

export class GetSingleResponseDTO<T> {
  /**
   * Item
   */
  data: T;

  /**
   * Meta Object
   */
  @IsObject()
  meta?: object;

  /**
   * Page
   * @param item Item
   * @param meta Metadata
   */
  constructor(item: T, meta?: object) {
    this.data = item;

    // Call method to mount the meta datas
    this.mountMeta(meta);
  }

  mountMeta(meta: object | undefined): void {
    this.meta = meta;
  }
}
