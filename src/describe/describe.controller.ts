import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { ProductPromptType } from '../../src/types/promptTypes';
import { describe } from '../../src/utils/getPrompt';
import { AuthGuard } from '../guards/auth/auth.guard';

@ApiTags('Describe') // Categoría para agrupar los endpoints relacionados con descripciones
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Token JWT en formato Bearer',
  required: true,
})
@Controller('describe')
export class DescribeController {
  @Post()
  @ApiOperation({ summary: 'Generar una descripción para un producto' }) // Descripción breve del endpoint
  @ApiResponse({
    status: 200,
    description: 'Descripción generada exitosamente.',
  }) // Respuesta esperada
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para generar la descripción.',
  }) // Respuesta en caso de error
  descibre(@Body() p: ProductPromptType) {
    return describe(p);
  }
}
