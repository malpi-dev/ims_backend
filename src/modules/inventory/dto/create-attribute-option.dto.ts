import { IsString } from 'class-validator';

export class CreateAttributeOptionDto {
  @IsString()
  label!: string;

  @IsString()
  value!: string;
}
