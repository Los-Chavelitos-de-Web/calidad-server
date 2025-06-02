
import { Test, TestingModule } from '@nestjs/testing';
import { PayController } from './pay.controller';
import { PayService } from './pay.service';
import { PrismaService } from '../../src/prisma.service';
import { factura } from '../../src/utils/genFacturas';
import { sendPaySuccess } from '../../src/utils/sendMail';
import { PaySuccess } from '../../src/types/PayTypes';

jest.mock('mercadopago', () => ({
  MercadoPagoConfig: jest.fn().mockImplementation(() => ({})),
  Preference: jest.fn().mockImplementation(() => ({
    create: jest.fn().mockResolvedValue({ id: 'mock-pref-id' }),
  })),
}));

jest.mock('../../src/utils/genFacturas', () => ({
  factura: jest.fn().mockResolvedValue({ data: { ruta_pdf: 'mock.pdf' } }),
}));

jest.mock('../../src/utils/sendMail', () => ({
  sendPaySuccess: jest.fn().mockResolvedValue(true),
}));

describe('Pay Module', () => {
  let controller: PayController;
  let service: PayService;
  let prisma: PrismaService;

  const mockPrisma = {
    user: {
      findFirst: jest.fn().mockResolvedValue({ id: 1, dni: '12345678', name: 'Carlos', email: 'carlos@test.com' }),
    },
    sale: {
      create: jest.fn(),
      findFirst: jest.fn().mockResolvedValue({ userId: 1 }),
    },
    saleItem: {
      createMany: jest.fn(),
      findMany: jest.fn().mockResolvedValue([
        {
          producto: 'Producto de prueba',
          codigo_producto: '1',
          cantidad: '2',
          precio_base: '100',
          codigo_unidad: 'ZZ',
          codigo_sunat: '-',
          tipo_igv_codigo: '10',
        },
      ]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayController],
      providers: [
        PayService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    controller = module.get<PayController>(PayController);
    service = module.get<PayService>(PayService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  // Controller Tests
  describe('PayController', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('success() should trigger success logic via service', async () => {
      const query: PaySuccess = {
        collection_id: '1',
        collection_status: 'approved',
        payment_id: '1',
        status: 'approved',
        external_reference: 'abc',
        payment_type: 'credit_card',
        merchant_order_id: 'order',
        preference_id: 'pref-id',
        site_id: 'MLA',
        processing_mode: 'aggregator',
        merchant_account_id: null,
      };

      jest.spyOn(service, 'success').mockResolvedValue('Pago realizado correctamente');
      const res = await controller.sucess(query);
      expect(service.success).toHaveBeenCalledWith(query.preference_id);
      expect(res).toBe('Pago realizado correctamente');
    });
  });

  // Service Tests
  describe('PayService', () => {
    it('createPreference should create preference, save sale and items', async () => {
      const result = await service.createPreference('test@test.com', [
        { id: '1', title: 'Producto', quantity: 1, unit_price: 100 },
      ]);

      expect(result).toEqual({ id: 'mock-pref-id' });
      expect(mockPrisma.sale.create).toHaveBeenCalled();
      expect(mockPrisma.saleItem.createMany).toHaveBeenCalled();
    });

    // it('success should generate factura, send mail and return success msg', async () => {
    //   const res = await service.success('mock-pref-id');

    //   expect(mockPrisma.sale.findFirst).toHaveBeenCalled();
    //   expect(mockPrisma.user.findFirst).toHaveBeenCalled();
    //   expect(mockPrisma.saleItem.findMany).toHaveBeenCalled();
    //   expect(factura).toHaveBeenCalled();
    //   expect(sendPaySuccess).toHaveBeenCalled();
    //   expect(res).toBe('Pago realizado correctamente');
    // });
  });
});
