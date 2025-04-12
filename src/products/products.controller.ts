import { Controller, Get } from '@nestjs/common';
import { Product } from 'src/models/Product';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly prodService: ProductsService) {}

  @Get('getAll')
  getAllProducts() {
    return this.prodService.getProducts();
  }
}
