import { Test, TestingModule } from '@nestjs/testing';
import { DescribeController } from './describe.controller';
import { AuthGuard } from '../../src/guards/auth/auth.guard';
import { PrismaService } from '../../src/prisma.service';

describe('DescribeController', () => {
  let controller: DescribeController;
  const prismaServiceMock = {
    sale: {
      findMany: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({}),
      // Agrega más métodos si los usas en tus tests
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescribeController],
      providers: [{ provide: PrismaService, useValue: prismaServiceMock }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // Simula el guard como si permitiera todo
      .compile();

    controller = module.get<DescribeController>(DescribeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
