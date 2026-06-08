import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateAttributeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsEnum(['string', 'number', 'boolean', 'date', 'enum', 'json', 'ip', 'mac'])
  valueType?: string;
}
