import { Injectable, NotFoundException } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { ProductPay } from 'src/models/Product';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_API_KEY || '',
});

@Injectable()
export class PayService {
  async createPreference(correo: string, products: ProductPay[]) {
    const pref = new Preference(client);

    try {
      const res = await pref.create({
        body: {
          items: products,
          back_urls: {
            success: `${process.env.FRONT_URL}/success`,
            failure: `${process.env.FRONT_URL}/failure`,
            pending: `${process.env.FRONT_URL}/pending`,
          },
          payer: {
            email: correo,
          },
        },
      });

      const prefId = res.id;
      console.log(res);
      return res;
    } catch (e) {
      console.error(`Error al crear la preferencia: ${e}`);
      throw new NotFoundException({
        message: 'Error al crear la preferencia',
        error: e,
      });
    }
  }
}
