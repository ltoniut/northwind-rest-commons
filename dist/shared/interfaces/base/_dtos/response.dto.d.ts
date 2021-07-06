export interface iResponseDTO<T> {
    data?: T | T[] | null;
    error?: string;
    message?: string;
}
