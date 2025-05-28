import { Body, Controller, Delete, Get, NotFoundException, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductCreate, ProductUpdate } from 'src/models/Product';

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
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida exitosamente.' }) // Respuesta esperada
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
  @ApiOperation({ summary: 'Crear un nuevo producto' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Crea un nuevo producto' }) // Respuesta esperada
  @ApiResponse({ status: 400, description: 'Error al crear el producto.' }) // Respuesta en caso de error
  async createProduct(@Body() p: ProductCreate) {
    try {
      return await this.prodService.createProduct(p);
    } catch (error) {
      throw new NotFoundException({
        status: 400,
        message: `Error al crear el producto: ${error}`
      });
    }
  }

  /**
   * Actualiza el producto a introducir en la base de datos
   * @param p Producto a actualizar
   * @returns Mensaje satisfactorio/error
   */
  @Put('update')
  @ApiOperation({ summary: 'Actualiza el producto' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Actualiza un producto' }) // Respuesta esperada
  @ApiResponse({ status: 400, description: 'Error al actualizar el producto.' }) // Respuesta en caso de error
  async updateProduct(@Body() p: ProductUpdate) {
    try {
      return await this.prodService.updateProduct(p.id, p);
    } catch (error) {
      throw new NotFoundException({
        status: 400,
        message: `Error al actualizar el producto: ${error}`
      });
    }
  }

  /**
   * Elimina un producto en la base de datos
   * @param id Identificador del producto
   * @returns Un mensaje de satisfaccion por parte de prisma o de error
   */
  @Delete('delete')
  @ApiOperation({ summary: 'Elimina el producto' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Elimina un producto' }) // Respuesta esperada
  @ApiResponse({ status: 400, description: 'Error al eliminar el producto.' }) // Respuesta en caso de error
  async deleteProduct(@Body() id: number) {
    try {
      return await this.prodService.deleteProduct(id);
    } catch (error) {
      throw new NotFoundException({
        status: 400,
        message: `Error al eliminar el producto: ${error}`
      });
    }
  }
}
