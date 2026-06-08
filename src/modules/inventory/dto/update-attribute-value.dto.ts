import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAttributeValueDto {
  @IsString()
  attributeId!: string;

  @IsOptional()
  @IsString()
  valueString?: string;

  @IsOptional()
  @IsNumber()
  valueNumber?: number;

  @IsOptional()
  @IsBoolean()
  valueBoolean?: boolean;

  @IsOptional()
  @IsString()
  valueDate?: string;

  @IsOptional()
  valueJson?: any;

  @IsOptional()
  @IsString()
  valueEnum?: string;
}
