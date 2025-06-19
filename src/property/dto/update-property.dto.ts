// src/property/dto/update-property.dto.ts
import { IsOptional, IsString, IsNumber, MinLength } from 'class-validator';

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  location?: string;
}
