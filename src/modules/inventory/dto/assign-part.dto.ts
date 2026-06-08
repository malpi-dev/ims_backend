import { IsEnum, IsOptional, IsString } from 'class-validator';

export class AssignPartDto {
  @IsString()
  partId!: string;

  @IsOptional()
  @IsString()
  folio?: string;

  @IsOptional()
  @IsEnum(['assigned', 'in_stock', 'consumed', 'lost', 'damaged', 'retired'])
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
