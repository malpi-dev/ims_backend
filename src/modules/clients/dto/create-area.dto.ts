import { IsOptional, IsString } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  name!: string;

  @IsString()
  code!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
