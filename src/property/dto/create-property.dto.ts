// src/property/dto/create-property.dto.ts
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  location: string;
}
