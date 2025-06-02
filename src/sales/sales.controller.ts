import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse } from 'node_modules/@nestjs/swagger/dist';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

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
  async getAll() {
    return await this.salesService.getAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiOperation({ summary: 'Devuelve una venta por individual' }) // Descripción breve del endpoint
  @ApiResponse({
    status: 201,
    description: 'Devuelve una venta por individual',
  }) // Respuesta esperada
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para obtener la venta.',
  }) // Respuesta en caso de error
  async getOne(@Param('id') id: string) {
    const data = await this.salesService.getOne(id);

    if (!data) {
      throw new NotFoundException({
        message: 'Sale not found',
        error: 'No sale found with the provided ID',
      });
    }
    return data;
  }
}
