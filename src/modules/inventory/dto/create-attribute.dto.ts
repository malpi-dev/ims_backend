import { IsEnum, IsString } from 'class-validator';

export class CreateAttributeDto {
  @IsString()
  name!: string;

  @IsString()
  code!: string;

  @IsEnum(['string', 'number', 'boolean', 'date', 'enum', 'json', 'ip', 'mac'])
  valueType!: string;
}
