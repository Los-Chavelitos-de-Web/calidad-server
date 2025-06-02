import { Test, TestingModule } from '@nestjs/testing';
import { ReservasController } from './reservas.controller';
import { JwtService } from '@nestjs/jwt';
import { JWTConfig } from '../../src/utils/jwt';
import { AuthGuard } from '../../src/guards/auth/auth.guard';
import { ReservasService } from './reservas.service';
import { PrismaService } from '../../src/prisma.service';

describe('ReservasController', () => {
  let controller: ReservasController;
  const jwtServiceMock = {
    signAsync: jest.fn().mockResolvedValue('fake-jwt-token'),
  };

  const jwtConfigMock = {
    getConfig: jest.fn().mockReturnValue({}),
  };

  const prismaServiceMock = {
    reserva: {
      findMany: jest.fn().mockResolvedValue([
        { id: 1, clienteId: 1 },
        { id: 2, clienteId: 2 },
      ]),
      findUnique: jest.fn(),
    },
    reservaItem: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservasController],
      providers: [
        ReservasService,
        { provide: PrismaService, useValue: prismaServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: JWTConfig, useValue: jwtConfigMock },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // Simula el guard como si permitiera todo
      .compile();

    controller = module.get<ReservasController>(ReservasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getAll', () => {
    it('should return a list of reservas', async () => {
      const result = await controller.getAll();
      expect(result).toEqual([
        { id: 1, clienteId: 1 },
        { id: 2, clienteId: 2 },
      ]);
      expect(prismaServiceMock.reserva.findMany).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return a reserva by ID', async () => {
      const reserva = { id: 1, clienteId: 1 };
      prismaServiceMock.reserva.findUnique.mockResolvedValue(reserva);

      const result = await controller.getOne('1');
      expect(result).toEqual(reserva);
      expect(prismaServiceMock.reserva.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if reserva not found', async () => {
      prismaServiceMock.reserva.findUnique.mockResolvedValue(null);

      await expect(controller.getOne('99')).rejects.toThrowError(
        'Reserva not found',
      );
    });
  });

  describe('getDetails', () => {
    it('should return details of a reserva', async () => {
      const details = [
        { id: 1, reservaId: 1, productoId: 1 },
        { id: 2, reservaId: 1, productoId: 2 },
      ];
      prismaServiceMock.reservaItem.findMany.mockResolvedValue(details);

      const result = await controller.getDetails('1');
      expect(result).toEqual(details);
      expect(prismaServiceMock.reservaItem.findMany).toHaveBeenCalledWith({
        where: { reservaId: 1 },
      });
    });

    it('should throw NotFoundException if no details found', async () => {
      prismaServiceMock.reservaItem.findMany.mockResolvedValue(null);

      await expect(controller.getDetails('99')).rejects.toThrowError(
        'Reserva not found',
      );
    });
  });
});
