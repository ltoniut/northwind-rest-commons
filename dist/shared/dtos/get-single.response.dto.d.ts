export declare class GetSingleResponseDTO<T> {
    /**
     * Item
     */
    data: T;
    /**
     * Meta Object
     */
    meta?: object;
    /**
     * Page
     * @param item Item
     * @param meta Metadata
     */
    constructor(item: T, meta?: object);
    mountMeta(meta: object | undefined): void;
}
