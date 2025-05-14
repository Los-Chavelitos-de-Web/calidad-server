import { IsNotEmpty, IsString } from "class-validator";
import { ProductPay } from "../../src/models/Product";

export class PayData {
  @IsNotEmpty()
  items: ProductPay[] = new Array<ProductPay>();

  @IsString()
  @IsNotEmpty()
  correo: string = '';
}

export class PaySuccess {
  @IsString()
  @IsNotEmpty()
  collection_id: string = '';

  @IsString()
  @IsNotEmpty()
  collection_status: string = '';

  @IsString()
  @IsNotEmpty()
  payment_id: string = '';

  @IsString()
  @IsNotEmpty()
  status: string = '';

  @IsString()
  @IsNotEmpty()
  external_reference: string | null = '';

  @IsString()
  @IsNotEmpty()
  payment_type: string = '';

  @IsString()
  @IsNotEmpty()
  merchant_order_id: string = '';

  @IsString()
  @IsNotEmpty()
  preference_id: string = '';

  @IsString()
  @IsNotEmpty()
  site_id: string = '';

  @IsString()
  @IsNotEmpty()
  processing_mode: string = '';

  @IsString()
  @IsNotEmpty()
  merchant_account_id: string | null = '';
}

