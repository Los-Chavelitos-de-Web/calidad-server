import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/Product';

@Injectable()
export class ProductsService {
  getProducts(): Product {
    return {
      name: 'Jose',
    };
  }
}
