import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ReservasService } from './reservas.service';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Get()
  getAll() {
    return this.reservasService.getAll();
  }

  @Get(':id')
  async getOne(id: number) {
    const data = await this.reservasService.getOne(id);

    if (!data) {
      throw new NotFoundException({
        message: 'Sale not found',
        error: 'No sale found with the provided ID',
      });
    }
    return data;
  }
}
