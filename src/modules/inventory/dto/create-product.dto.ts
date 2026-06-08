import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  inventoryCode!: string;

  @IsOptional()
  @IsString()
  serialNumber?: string;

  @IsString()
  productTypeId!: string;

  @IsString()
  modelId!: string;

  @IsOptional()
  @IsString()
  purchaseDate?: string;

  @IsOptional()
  @IsEnum(['active', 'in_repair', 'retired', 'lost', 'disposed'])
  status?: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
