import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductPromptType } from '../../src/types/promptTypes';
import { describe } from '../../src/utils/getPrompt';

@ApiTags('Describe') // Categoría para agrupar los endpoints relacionados con descripciones
@Controller('describe')
export class DescribeController {

  @Post()
  @ApiOperation({ summary: 'Generar una descripción para un producto' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Descripción generada exitosamente.' }) // Respuesta esperada
  @ApiResponse({ status: 400, description: 'Datos inválidos para generar la descripción.' }) // Respuesta en caso de error
  descibre(@Body() p: ProductPromptType) {
    return describe(p);
  }
}
