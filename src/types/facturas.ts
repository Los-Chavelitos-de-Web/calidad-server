import { IsNotEmpty, IsString } from "node_modules/class-validator/types";

export class ClienteType {
  @IsString()
  @IsNotEmpty()
  razon_social_nombres: string | undefined = '';

  @IsString()
  @IsNotEmpty()
  numero_documento: string | undefined = '';

  @IsString()
  @IsNotEmpty()
  codigo_tipo_entidad: string = '';

  @IsString()
  @IsNotEmpty()
  cliente_direccion?: string = '';
}

export class ItemsType {
  @IsString()
  @IsNotEmpty()
  producto: string = '';

  @IsString()
  @IsNotEmpty()
  cantidad: string = '';

  @IsString()
  @IsNotEmpty()
  precio_base: string = '';

  @IsString()
  @IsNotEmpty()
  codigo_sunat: string = '';

  @IsString()
  @IsNotEmpty()
  codigo_producto: string = '';

  @IsString()
  @IsNotEmpty()
  codigo_unidad: string = '';

  @IsString()
  @IsNotEmpty()
  tipo_igv_codigo: string = '';
}
