import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export interface Product {
  name: string;
  description?: string;
  brand?: string;
  price?: number;
  stock?: number;
  createdAt?: Date;
}

export class ProductPay {

  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  title: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  unit_price: number;
}
