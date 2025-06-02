import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma.service';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.sale.findMany();
  }

  getOne(id: string) {
    return this.prisma.sale.findFirst({
        where: { id: id },
    });
  }
}
