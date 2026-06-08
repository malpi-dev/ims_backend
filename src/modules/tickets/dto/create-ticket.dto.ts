import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  productId!: string;

  @IsString()
  problemType!: string;

  @IsString()
  problemDescription!: string;

  @IsOptional()
  @IsArray()
  images?: string[];
}
