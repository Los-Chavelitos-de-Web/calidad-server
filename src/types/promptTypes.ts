import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class ProductPromptType {
  @IsString()
  @IsNotEmpty()
  title: string = '';

  @IsString()
  @IsNotEmpty()
  brand: string = '';

  @IsString()
  @IsNotEmpty()
  model: string = '';

  @IsString()
  @IsNotEmpty()
  category: string = '';

  @IsObject()
  @IsNotEmpty()
  specs: Record<string, any> = {};
}
