import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma.service';
import { PrismaClient } from '../../prisma/generated';

describe('ProductsController', () => {
  let controller: ProductsController;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, PrismaService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all products and validate their structure', async () => {
    const result = await controller.getAllProducts();

    // Verifica que sea un array y tenga al menos un producto
    expect(Array.isArray(result)).toBe(true);

    for (const product of result) {
      expect(product).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          description: expect.any(String),
          manualUrl: expect.any(String),
          price: expect.any(Number),
          stock: expect.any(Number),
          createdAt: expect.any(Date),
        }),
      );
    }
  });
});
