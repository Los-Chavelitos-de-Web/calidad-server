import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"; // Importar ApiProperty

export class Product {
  @ApiProperty({ description: 'Nombre del producto' })
  name: string = '';

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
