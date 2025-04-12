import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma.service';
import { PrismaClient } from '@prisma/client';

describe('ProductsController', () => {
  let controller: ProductsController;
  let prismaService: PrismaService;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, PrismaService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of products with correct attributes', async () => {
    const result = await controller.getAllProducts();

    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          brand: expect.any(String),
          price: expect.any(Number),
          stock: expect.any(Number),
          createdAt: expect.any(Date),
        },
      ]),
    );
  });
});
