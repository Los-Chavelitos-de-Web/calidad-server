import { Test, TestingModule } from '@nestjs/testing';
import { SalesController } from './sales.controller';
import { JwtService } from '@nestjs/jwt';
import { JWTConfig } from '../../src/utils/jwt';
import { AuthGuard } from '../../src/guards/auth/auth.guard';
import { SalesService } from './sales.service';
import { PrismaService } from '../../src/prisma.service'; // Ajusta la ruta si es distinta

describe('SalesController', () => {
  let controller: SalesController;

  const jwtServiceMock = {
    signAsync: jest.fn().mockResolvedValue('fake-jwt-token'),
  };

  const jwtConfigMock = {
    getConfig: jest.fn().mockReturnValue({}),
  };

  const prismaServiceMock = {
    sale: {
      findMany: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({}),
      // Agrega más métodos si los usas en tus tests
    },
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
      .useValue({ canActivate: () => true }) // Bypass del guard
      .compile();

    controller = module.get<SalesController>(SalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
