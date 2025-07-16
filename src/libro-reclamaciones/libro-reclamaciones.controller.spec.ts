import { Test, TestingModule } from '@nestjs/testing';
import { LibroReclamacionesController } from './libro-reclamaciones.controller';
import { LibroReclamacionesService } from './libro-reclamaciones.service';
import {
  LibroReclamacionesCreate,
  LibroReclamacionesResponse,
  LibroReclamacionesUpdate,
} from '../models/LibroReclamaciones';
import { JwtService } from '@nestjs/jwt';

describe('LibroReclamacionesController', () => {
  let controller: LibroReclamacionesController;
  let service: LibroReclamacionesService;

  const mockLibroService = {
    getAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updateStatus: jest.fn(),
    responder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibroReclamacionesController],
      providers: [
        {
          provide: LibroReclamacionesService,
          useValue: mockLibroService,
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<LibroReclamacionesController>(
      LibroReclamacionesController,
    );
    service = module.get<LibroReclamacionesService>(LibroReclamacionesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of reclamaciones', async () => {
      const result = [{ id: 1, title: 'Test' }];
      mockLibroService.getAll.mockResolvedValue(result);

      expect(await controller.getAll()).toEqual(result);
      expect(mockLibroService.getAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new reclamación', async () => {
      const dto: LibroReclamacionesCreate = {
        title: 'New',
        description: 'Desc',
        userId: 1,
      };
      const result = { id: 1, ...dto };

      mockLibroService.create.mockResolvedValue(result);
      expect(await controller.create(dto)).toEqual(result);
      expect(mockLibroService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a reclamación', async () => {
      const id = '1';
      const dto: LibroReclamacionesUpdate = {
        title: 'Updated',
        description: 'Updated Desc',
        userId: 1,
      };
      const result = { id: 1, ...dto };

      mockLibroService.update.mockResolvedValue(result);
      expect(await controller.update(id, dto)).toEqual(result);
      expect(mockLibroService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('updateStatus', () => {
    it('should update the status to CANCELADA', async () => {
      const id = '1';
      const result = { id: 1, status: 'CANCELADA' };

      mockLibroService.updateStatus.mockResolvedValue(result);
      expect(await controller.updateStatus(id)).toEqual(result);
      expect(mockLibroService.updateStatus).toHaveBeenCalledWith(1);
    });
  });

  describe('responder', () => {
    it('should respond to a reclamación and return confirmation message', async () => {
      const response: LibroReclamacionesResponse = {
        libro_id: 1,
        content: 'Respuesta al cliente',
      };

      const result = {
        ok: true,
        message: 'Respuesta enviada',
      };

      mockLibroService.responder.mockResolvedValue(result);
      expect(await controller.responder(response)).toEqual(result);
      expect(mockLibroService.responder).toHaveBeenCalledWith(response);
    });
  });
});
