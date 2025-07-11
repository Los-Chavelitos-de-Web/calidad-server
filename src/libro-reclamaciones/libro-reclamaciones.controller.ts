import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LibroReclamacionesService } from './libro-reclamaciones.service';
import {
  LibroReclamacionesCreate,
  LibroReclamacionesResponse,
} from 'src/models/LibroReclamaciones';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('libro-reclamaciones')
export class LibroReclamacionesController {
  constructor(private readonly libroService: LibroReclamacionesService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiOperation({ summary: 'Obtienes todas las reclamaciones de los clientes.' })
  @ApiResponse({ status: 200, description: 'Obtención obtenida efectivamente.' })
  @ApiResponse({ status: 400, description: 'Error al obtener todas las reclamaciones.' })
  @Get()
  getAll() {
    return this.libroService.getAll();
  }

  @ApiOperation({ summary: 'Creas una nueva reclamacion de los clientes.' })
  @ApiResponse({ status: 200, description: 'Creación del libro.' })
  @ApiResponse({ status: 400, description: 'Error al crear la reclamación.' })
  @Post()
  create(@Body() libro: LibroReclamacionesCreate) {
    return this.libroService.create(libro);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiOperation({ summary: 'Actualizar la reclamacion del cliente.' })
  @ApiResponse({ status: 200, description: 'Actualización hecha efectivamente.' })
  @ApiResponse({ status: 400, description: 'Error al actualizar la reclamación.' })
  @Put(':id')
  update(@Param('id') id, @Body() libro: LibroReclamacionesCreate) {
    return this.libroService.update(parseInt(id), libro);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiOperation({ summary: 'Cancelar la reclamacion del cliente.' })
  @ApiResponse({ status: 200, description: 'Cancelado de la reclamacion hecha efectivamente.' })
  @ApiResponse({ status: 400, description: 'Error al cancelar la reclamación.' })
  @Put(':id')
  updateStatus(@Param('id') id) {
    return this.libroService.updateStatus(parseInt(id));
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiOperation({ summary: 'Responder a la reclamacion del cliente.' })
  @ApiResponse({ status: 200, description: 'Respuesta de la reclamacion enviada al correo del cliente.' })
  @ApiResponse({ status: 400, description: 'Error al realizar la respuesta de la reclamación.' })
  @Post('responder')
  responder(@Body() response: LibroReclamacionesResponse) {
    return this.libroService.responder(response);
  }

  // @Delete(':id')
  // delete(@Param('id') id) {
  //     return this.libroService.delete(parseInt(id));
  // }
}
