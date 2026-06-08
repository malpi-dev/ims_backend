import { IsOptional, IsString } from 'class-validator';

export class CreateTicketProblemTypeDto {
  @IsString()
  productTypeId!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateTicketProblemTypeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
