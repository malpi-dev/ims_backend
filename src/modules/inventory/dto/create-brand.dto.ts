import { IsString } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  name!: string;

  @IsString()
  code!: string;
}
