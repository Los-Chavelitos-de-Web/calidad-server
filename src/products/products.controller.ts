import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('Products') // Categoría para agrupar los endpoints relacionados con productos
@Controller('products')
export class ProductsController {
  constructor(private readonly prodService: ProductsService) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los productos' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida exitosamente.' }) // Respuesta esperada
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' }) // Respuesta en caso de error
  getAllProducts() {
    return this.prodService.getProducts();
  }
}
