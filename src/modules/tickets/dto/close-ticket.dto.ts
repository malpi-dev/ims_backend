import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CloseTicketDto {
  @IsString()
  failureCause!: string;

  @IsOptional()
  @IsBoolean()
  negligence?: boolean;

  @IsOptional()
  @IsArray()
  replacedParts?: string[];

  @IsOptional()
  @IsString()
  evidenceImage?: string;
}
