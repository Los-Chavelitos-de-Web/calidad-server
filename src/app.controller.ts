import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App') // Categoría para agrupar los endpoints en Swagger
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener mensaje de bienvenida' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Mensaje de bienvenida retornado exitosamente.' }) // Respuesta esperada
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' }) // Respuesta en caso de error
  getHello(): string {
    return this.appService.getHello();
  }
}
