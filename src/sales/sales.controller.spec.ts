import { Test, TestingModule } from '@nestjs/testing';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { PrismaService } from '../../src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JWTConfig } from '../../src/utils/jwt';
import { AuthGuard } from '../../src/guards/auth/auth.guard';
import { NotFoundException } from '@nestjs/common';

describe('SalesController', () => {
  let controller: SalesController;

  const prismaServiceMock = {
    sale: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    saleItem: {
      findMany: jest.fn(),
    },
  };

  const jwtServiceMock = {
    signAsync: jest.fn().mockResolvedValue('fake-jwt-token'),
  };

  const jwtConfigMock = {
    getConfig: jest.fn().mockReturnValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesController],
      providers: [
        SalesService,
        { provide: PrismaService, useValue: prismaServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: JWTConfig, useValue: jwtConfigMock },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // Simula autenticación exitosa
      .compile();

    controller = module.get<SalesController>(SalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all sales', async () => {
      const mockSales = [
        { id: '1', clienteId: 1 },
        { id: '2', clienteId: 2 },
      ];
      prismaServiceMock.sale.findMany.mockResolvedValue(mockSales);

      const result = await controller.getAll();
      expect(result).toEqual(mockSales);
      expect(prismaServiceMock.sale.findMany).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return a sale by ID', async () => {
      const mockSale = { id: '1', clienteId: 1 };
      prismaServiceMock.sale.findFirst.mockResolvedValue(mockSale);

      const result = await controller.getOne('1');
      expect(result).toEqual(mockSale);
      expect(prismaServiceMock.sale.findFirst).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if sale not found', async () => {
      prismaServiceMock.sale.findFirst.mockResolvedValue(null);

      await expect(controller.getOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getDetails', () => {
    it('should return details of a sale', async () => {
      const mockDetails = [
        { id: 1, saleId: '1', productoId: 1 },
        { id: 2, saleId: '1', productoId: 2 },
      ];
      prismaServiceMock.saleItem.findMany.mockResolvedValue(mockDetails);

      const result = await controller.getDetails('1');
      expect(result).toEqual(mockDetails);
      expect(prismaServiceMock.saleItem.findMany).toHaveBeenCalledWith({
        where: { saleId: '1' },
      });
    });

    it('should throw NotFoundException if no details found', async () => {
      prismaServiceMock.saleItem.findMany.mockResolvedValue(null);

      await expect(controller.getDetails('999')).rejects.toThrow(NotFoundException);
    });
  });
});
