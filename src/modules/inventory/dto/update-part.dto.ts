import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdatePartDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsEnum(['accessory', 'spare_part', 'consumable'])
  partType?: string;
}
