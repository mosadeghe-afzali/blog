import { IsEnum, IsOptional, IsPositive, IsString } from "class-validator";

export enum Sort {
  title = 'title',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt'
}
export class BlogQueryDto {
  @IsOptional()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(Sort)
  sort?: Sort;
}