import { IsEnum, IsString } from 'class-validator';

export class CreatePartDto {
  @IsString()
  name!: string;

  @IsString()
  code!: string;

  @IsEnum(['accessory', 'spare_part', 'consumable'])
  partType!: string;
}
