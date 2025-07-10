import { Test, TestingModule } from '@nestjs/testing';
import { LibroReclamacionesController } from './libro-reclamaciones.controller';

describe('LibroReclamacionesController', () => {
  let controller: LibroReclamacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibroReclamacionesController],
    }).compile();

    controller = module.get<LibroReclamacionesController>(LibroReclamacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
