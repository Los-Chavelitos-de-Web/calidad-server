import { Injectable, NotFoundException } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { ProductPay } from '../../src/models/Product';
import { PrismaService } from '../../src/prisma.service';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_API_KEY || '',
});

@Injectable()
export class PayService {

  constructor(private readonly prisma: PrismaService) { }

  async createPreference(correo: string, products: ProductPay[]) {
    const pref = new Preference(client);

    if (!correo) {
      throw new NotFoundException({
        message: 'El correo es requerido',
        error: 'El correo es requerido',
      });
    }

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

      const userId = await this.prisma.user.findFirst({
        where: {
          email: correo,
        },
        select: {
          id: true,
        },
      });

      const items = products.map((item) => ({
        saleId: prefId || '',
        producto: item.title,
        cantidad: item.quantity + '',
        precio_base: item.unit_price + '',
        codigo_sunat: '-',
        codigo_unidad: 'ZZ',
        tipo_igv_codigo: '10'
      }));

      await this.prisma.sale.create({
        data: {
          id: prefId || '',
          userId: userId?.id || 0,
          status: 'pending',
          total: products.reduce((acc, item) => acc + item.unit_price * item.quantity, 0),
        }
      });

      await this.prisma.saleItem.createMany({
        data: items,
      });

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
