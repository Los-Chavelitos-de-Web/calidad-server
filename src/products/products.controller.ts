import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductCreate, ProductUpdate } from '../../src/models/Product';
import { AuthGuard } from '../guards/auth/auth.guard';

@ApiTags('Products') // Categoría para agrupar los endpoints relacionados con productos
@Controller('products')
export class ProductsController {
  constructor(private readonly prodService: ProductsService) {}

  /**
   * EndPoint de /getAll para enlistar todos los productos
   * @returns toda la lista de productos
   */
  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los productos' }) // Descripción breve del endpoint
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida exitosamente.',
  }) // Respuesta esperada
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' }) // Respuesta en caso de error
  getAllProducts() {
    return this.prodService.getProducts();
  }

  /**
   * Endpoint para crear los productos
   * @param p Producto nuevo a agregar
   * @returns Un mensaje de satisfaccion
   */
  @Post('create')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Crear un nuevo producto' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Crea un nuevo producto' }) // Respuesta esperada
  @ApiResponse({ status: 400, description: 'Error al crear el producto.' }) // Respuesta en caso de error
  async createProduct(@Body() p: ProductCreate) {
    try {
      return await this.prodService.createProduct(p);
    } catch (error) {
      throw new NotFoundException({
        status: 400,
        message: `Error al crear el producto: ${error}`,
      });
    }
  }

  /**
   * Actualiza el producto a introducir en la base de datos
   * @param p Producto a actualizar
   * @returns Mensaje satisfactorio/error
   */
  @Put('update')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualiza el producto' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Actualiza un producto' }) // Respuesta esperada
  @ApiResponse({ status: 400, description: 'Error al actualizar el producto.' }) // Respuesta en caso de error
  async updateProduct(@Body() p: ProductUpdate) {
    try {
      return await this.prodService.updateProduct(p.id, p);
    } catch (error) {
      throw new NotFoundException({
        status: 400,
        message: `Error al actualizar el producto: ${error}`,
      });
    }
  }

  /**
   * Elimina un producto en la base de datos
   * @param id Identificador del producto
   * @returns Un mensaje de satisfaccion por parte de prisma o de error
   */
  @Delete('delete')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Elimina el producto' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Elimina un producto' }) // Respuesta esperada
  @ApiResponse({ status: 400, description: 'Error al eliminar el producto.' }) // Respuesta en caso de error
  async deleteProduct(@Body() req: { id: number }) {
    try {
      await this.prodService.deleteProduct(req.id);

      return {
        res: 'ok',
        message: `Producto ${req.id} eliminado correctamente`
      }
    } catch (error) {
      throw new NotFoundException({
        status: 400,
        message: `Error al eliminar el producto: ${error}`,
      });
    }
  }
}
