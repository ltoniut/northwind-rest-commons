/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PipeTransform } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { FilterQuery } from './filter-query';

export const GetPageDTOLimit = 20;

export interface IPageQuery {
  baseUrl: string;
  offset: number;
  limit: number;
  sortField: string;
  sortDir: 'ASC' | 'DESC';
}

export class PagePipe implements PipeTransform<any> {
  transform(src: any): PageQuery {
    const dst = new PageQuery({
      ...src,
      page: src.page ? parseInt(`${src.page}`, 10) : undefined,
      limit: src.limit ? parseInt(`${src.limit}`, 10) : undefined,
    });
    return dst;
  }
}

export class PageQuery extends FilterQuery {
  constructor(src: Record<string, any> = {}) {
    super(src);
  }

  @IsOptional()
  @IsString()
  baseUrl?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  sort?: string;

  get pageDTO(): IPageQuery {
    const baseUrl = this.baseUrl || '';
    const limit = this.limit || GetPageDTOLimit;
    const offset = (this.page || 0) * limit;
    const sortMatch = (this.sort || '').match(/([+-]?)([a-z0-9]+)/i);
    const sortField = sortMatch ? sortMatch[2] : '';
    const sortDir = sortMatch && sortMatch[1] !== '-' ? 'ASC' : 'DESC';

    return { baseUrl, limit, offset, sortField, sortDir };
  }

  sortAsc(): boolean {
    return !/^[-]/.test(this.sort || '');
  }
  sortField(): string {
    return (this.sort || '').replace(/[+-]/, '');
  }
}
