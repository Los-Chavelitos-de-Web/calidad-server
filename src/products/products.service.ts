import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductCreate, ProductUpdate } from '../../src/models/Product';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProducts() {
    return this.prisma.product.findMany();
  }

  getOneProduct(id: number) {
    return this.prisma.product.findFirst({
      where: {
        id,
      },
    });
  }

  createProduct(p: ProductCreate) {
    const data: Prisma.ProductCreateInput = {
      title: p.title,
      description: p.description ?? undefined,
      brand: p.brand ?? '',
      price: p.price ?? 0,
      stock: p.stock ?? 0,
      createdAt: p.createdAt ?? new Date(),
      model: p.model ?? '',
      category: p.category ?? '',
      manufacturer: p.manufacturer ?? '',
      manualUrl: p.manualUrl ?? '',
      specs: p.specs ?? {},
    };

    return this.prisma.product.create({ data });
  }

  updateProduct(id: number, p: ProductUpdate) {
    const data: Prisma.ProductUpdateInput = {
      ...(p.title && { title: p.title }),
      ...(p.description && { description: p.description }),
      ...(p.brand && { brand: p.brand }),
      ...(typeof p.price === 'number' && { price: p.price }),
      ...(p.stock && { stock: p.stock }),
      ...(p.createdAt && { createdAt: p.createdAt }),
      ...(p.model && { model: p.model }),
      ...(p.category && { category: p.category }),
      ...(p.manufacturer && { manufacturer: p.manufacturer }),
      ...(p.manualUrl && { manualUrl: p.manualUrl }),
      ...(p.specs && { specs: p.specs }),
      ...(typeof p.isActive === 'boolean' && { isActive: p.isActive }),
    };
    console.log(data);

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  deleteProduct(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
