import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ReservasService } from './reservas.service';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Get('getAll')
  getAll() {
    return this.reservasService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const data = await this.reservasService.getOne(parseInt(id));

    if (!data) {
      throw new NotFoundException({
        message: 'Reserva not found',
        error: 'No reserva found with the provided ID',
      });
    }
    return data;
  }
}
