import { ProductPay } from "../../src/models/Product";

export type PayData = {
  items: ProductPay[];
  correo: string;
}
