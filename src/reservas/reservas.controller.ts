import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse } from 'node_modules/@nestjs/swagger/dist';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Get('getAll')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiOperation({ summary: 'Devuelve la lista de todas las ventas' }) // Descripción breve del endpoint
  @ApiResponse({
    status: 201,
    description: 'Devuelve la lista de todas las ventas',
  }) // Respuesta esperada
  getAll() {
    return this.reservasService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiOperation({ summary: 'Obtener una reserva individual' }) // Descripción breve del endpoint
  @ApiResponse({
    status: 201,
    description: 'Obtener una reserva individual',
  }) // Respuesta esperada
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para obtener la reserva.',
  }) // Respuesta en caso de error
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
