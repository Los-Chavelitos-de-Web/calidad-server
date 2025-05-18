import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProductPromptType {
  @ApiProperty({ description: 'Título del producto' })
  @IsString()
  @IsNotEmpty()
  title: string = '';

  @ApiProperty({ description: 'Marca del producto' })
  @IsString()
  @IsNotEmpty()
  brand: string = '';

  @ApiProperty({ description: 'Modelo del producto' })
  @IsString()
  @IsNotEmpty()
  model: string = '';

  @ApiProperty({ description: 'Categoría del producto' })
  @IsString()
  @IsNotEmpty()
  category: string = '';

  @ApiProperty({ description: 'Especificaciones del producto en formato clave-valor' })
  @IsObject()
  @IsNotEmpty()
  specs: Record<string, any> = {};
}
