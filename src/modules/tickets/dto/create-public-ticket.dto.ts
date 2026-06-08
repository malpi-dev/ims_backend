import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePublicTicketDto {
  @IsString()
  inventoryCode!: string;

  @IsString()
  reporterName!: string;

  @IsString()
  reporterContact!: string;

  @IsString()
  problemType!: string;

  @IsString()
  problemDescription!: string;

  @IsOptional()
  @IsArray()
  images?: string[];
}
