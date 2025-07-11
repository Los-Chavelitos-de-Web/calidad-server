import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"; // Importar ApiProperty


export class Product {
  @ApiProperty({ description: 'Nombre del producto' })
  title: string = '';

  @ApiProperty({ description: 'Descripción del producto', required: false })
  description?: string = '';

  @ApiProperty({ description: 'Marca del producto', required: false })
  brand?: string = '';

  @ApiProperty({ description: 'Precio del producto', required: false })
  price?: number;

  @ApiProperty({ description: 'Cantidad en stock del producto', required: false })
  stock?: number;

  @ApiProperty({ description: 'Fecha de creación del producto', required: false })
  createdAt?: Date;
}

export class ProductCreate {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsNotEmpty()
  @IsString()
  title: string = '';

  @ApiProperty({ description: 'Imagen del producto' })
  @IsString()
  imageUrl?: string = '';

  @ApiProperty({ description: 'Descripción del producto', required: false })
  @IsString()
  description?: string = '';

  @ApiProperty({ description: 'Marca del producto' })
  @IsNotEmpty()
  @IsString()
  brand?: string = '';

  @ApiProperty({ description: 'Precio del producto' })
  @IsNotEmpty()
  @IsNumber()
  price?: number;

  @ApiProperty({ description: 'Cantidad en stock del producto' })
  @IsNotEmpty()
  @IsObject({ message: 'El stock es un Objeto JSON y debe seguir el formato de stock: { Piura: 0, Sullana: 0, Tambogrande: 0 }' })
  stock?: Record<string, any> = {};

  @ApiProperty({ description: 'Fecha de creación del producto' })
  createdAt?: Date;

  @ApiProperty({ description: 'Modelo del producto' })
  @IsNotEmpty()
  @IsString()
  model?: string = '';

  @ApiProperty({ description: 'Categoria del producto' })
  @IsNotEmpty()
  @IsString()
  category?: string = '';

  @ApiProperty({ description: 'Manufacter del producto' })
  @IsNotEmpty()
  @IsString()
  manufacturer?: string = '';

  @ApiProperty({ description: 'Manual del producto' })
  @IsNotEmpty()
  @IsString()
  manualUrl?: string = '';

  @ApiProperty({ description: 'Especificaciones del producto' })
  @IsObject()
  @IsNotEmpty()
  specs: Record<string, any> = {};

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ProductUpdate {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsNotEmpty()
  @IsString()
  title: string = '';

  @ApiProperty({ description: 'Imagen del producto' })
  @IsString()
  imageUrl?: string = '';

  @ApiProperty({ description: 'Descripción del producto', required: false })
  @IsString()
  description?: string = '';

  @ApiProperty({ description: 'Marca del producto' })
  @IsNotEmpty()
  @IsString()
  brand?: string = '';

  @ApiProperty({ description: 'Precio del producto' })
  @IsNotEmpty()
  @IsNumber()
  price?: number;

  @ApiProperty({ description: 'Cantidad en stock del producto' })
  @IsNotEmpty()
  @IsObject({ message: 'El stock es un Objeto JSON y debe seguir el formato de stock: { Piura: 0, Sullana: 0, Tambogrande: 0 }' })
  stock?: Record<string, any> = {};

  @ApiProperty({ description: 'Fecha de creación del producto' })
  createdAt?: Date;

  @ApiProperty({ description: 'Modelo del producto' })
  @IsNotEmpty()
  @IsString()
  model?: string = '';

  @ApiProperty({ description: 'Categoria del producto' })
  @IsNotEmpty()
  @IsString()
  category?: string = '';

  @ApiProperty({ description: 'Manufacter del producto' })
  @IsNotEmpty()
  @IsString()
  manufacturer?: string = '';

  @ApiProperty({ description: 'Manual del producto' })
  @IsNotEmpty()
  @IsString()
  manualUrl?: string = '';

  @ApiProperty({ description: 'Especificaciones del producto' })
  @IsObject()
  @IsNotEmpty()
  specs: Record<string, any> = {};

  @ApiProperty({ description: 'Estado del producto' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ProductUpdateStatus {
  @ApiProperty({ description: 'Estado del producto' })
  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean;
}

export class ProductPay {
  @ApiProperty({ description: 'ID del producto' })
  @IsNotEmpty()
  id: string = '';

  @ApiProperty({ description: 'Título del producto', minLength: 5 })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  title: string = '';

  @ApiProperty({ description: 'Cantidad del producto' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number = 0;

  @ApiProperty({ description: 'Precio unitario del producto' })
  @IsNotEmpty()
  @IsNumber()
  unit_price: number = 0;
}
