import { Injectable } from '@nestjs/common';
import {
  LibroReclamacionesBase,
  LibroReclamacionesCreate,
  LibroReclamacionesResponse,
  LibroReclamacionesUpdate,
} from 'src/models/LibroReclamaciones';
import { PrismaService } from 'src/prisma.service';
import { sendLibroReclamaciones } from 'src/utils/sendMail';

@Injectable()
export class LibroReclamacionesService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.libroReclamaciones.findMany();
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

  async responder(response: LibroReclamacionesResponse) {
    const libro = await this.prisma.libroReclamaciones.update({
      where: {
        id: response.libro_id || 0,
      },
      data: {
        status: 'CONFIRMADA',
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: libro.userId,
      },
      select: {
        email: true,
      },
    });

    await sendLibroReclamaciones(response?.content || '', user?.email || '');

    return {
      ok: true,
      message: `Respuesta a ${libro?.title} enviada a ${user?.email}.`,
    };
  }

  updateStatus(id: number) {
    return this.prisma.libroReclamaciones.update({
      where: {
        id,
      },
      data: {
        status: 'CANCELADA',
      },
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
