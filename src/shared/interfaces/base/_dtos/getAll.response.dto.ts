import { ResponseDTO } from '@src/shared/dtos/response.dto';

interface TLinks {
  self: string;
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface GetAllBaseResponseDTO<T> extends ResponseDTO<T> {
  links: TLinks;
  meta?: object;
  page: number;
  limit: number;
  count: number;
  pages: number;
}
