import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma.service';

@Injectable()
export class ReservasService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.reserva.findMany();
  }

  getOne(id: number) {
    return this.prisma.reserva.findUnique({
      where: { id },
    });
  }

  getDetails(id: number) {
    return this.prisma.reservaItem.findMany({
      where: { reservaId: id },
    });
  }
}
