import { Injectable } from '@nestjs/common';
import { PrismaPromise } from '@prisma/client';
import { Product } from 'src/models/Product';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {

    constructor(private prisma: PrismaService) {}

  getProducts() {
    return this.prisma.product.findMany();
  }
}
