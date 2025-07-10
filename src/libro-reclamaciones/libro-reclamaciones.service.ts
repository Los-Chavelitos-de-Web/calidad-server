import { Injectable } from '@nestjs/common';
import { LibroReclamacionesCreate, LibroReclamacionesUpdate } from 'src/models/LibroReclamaciones';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LibroReclamacionesService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    this.prisma.libroReclamaciones.findMany();
  }

  create(libroData: LibroReclamacionesCreate) {
    return this.prisma.libroReclamaciones.create({
      data: libroData,
    });
  }

  update(id: number, libroData: LibroReclamacionesUpdate) {
    return this.prisma.libroReclamaciones.update({
      where: {
        id,
      },
      data: libroData,
    });
  }

  delete(id: number) {
    return this.prisma.libroReclamaciones.delete({
      where: {
        id,
      },
    });
  }
}
