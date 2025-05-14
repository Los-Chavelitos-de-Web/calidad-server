import { Injectable, NotFoundException } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { ProductPay } from '../../src/models/Product';
import { PrismaService } from '../../src/prisma.service';
import { factura } from 'src/utils/genFacturas';
import { ClienteType } from 'src/types/facturas';
import { sendPaySuccess } from 'src/utils/sendMail';

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
            success: `${process.env.BACK_URL}/pay/success`,
            failure: `${process.env.BACK_URL}/pay/failure`,
            pending: `${process.env.BACK_URL}/pay/pending`,
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
        codigo_producto: item.id + '',
        codigo_unidad: 'ZZ',
        codigo_sunat: '-',
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

  async success(prefId: string) {

    const userId = await this.prisma.sale.findFirst({
      where: {
        id: prefId,
      },
      select: {
        userId: true,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId?.userId,
      },
      select: {
        dni: true,
        name: true,
        email: true,
      },
    });

    const items = await this.prisma.saleItem.findMany({
      where: {
        saleId: prefId,
      },
      select: {
        producto: true,
        codigo_producto: true,
        cantidad: true,
        precio_base: true,
        codigo_unidad: true,
        codigo_sunat: true,
        tipo_igv_codigo: true,
      },
    });

    const cliente: ClienteType = {
      numero_documento: '000' + user?.dni || '00000000000',
      razon_social_nombres: user?.name,
      codigo_tipo_entidad: '6',
      cliente_direccion: '',
    };

    const { data } = await factura(cliente, items);
    const { ruta_pdf } = data;

    await sendPaySuccess(prefId, user?.email || '', items, ruta_pdf);

    return 'Pago realizado correctamente';
  }
}
