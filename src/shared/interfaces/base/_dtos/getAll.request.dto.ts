import { IsString, IsOptional, IsNumber } from 'class-validator';

export class GetAllBaseRequestDTO {
  @IsOptional()
  @IsString()
  baseUrl?: string;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  sortField?: string;

  @IsOptional()
  @IsString()
  sortDir?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  clause?: string;

  @IsOptional()
  @IsString()
  params?: Array<string>;
}
