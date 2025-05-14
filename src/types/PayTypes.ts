import { ProductPay } from "../../src/models/Product";

export type PayData = {
  items: ProductPay[];
  correo: string;
}

export type PaySuccess = {
  collection_id: string;
  collection_status: string;
  payment_id: string;
  status: string;
  external_reference: string | null;
  payment_type: string;
  merchant_order_id: string;
  preference_id: string;
  site_id: string;
  processing_mode: string;
  merchant_account_id: string | null;
}
