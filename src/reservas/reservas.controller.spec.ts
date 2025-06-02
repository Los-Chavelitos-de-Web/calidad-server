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
    sale: {
      findMany: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({}),
      // Agrega más métodos si los usas en tus tests
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
});
