import { IsOptional, IsString } from 'class-validator';

export class UpdateProductTypeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;
}
