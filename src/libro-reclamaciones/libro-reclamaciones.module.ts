import { Module } from '@nestjs/common';
import { LibroReclamacionesController } from './libro-reclamaciones.controller';
import { LibroReclamacionesService } from './libro-reclamaciones.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LibroReclamacionesController],
  providers: [LibroReclamacionesService, PrismaService]
})
export class LibroReclamacionesModule {}
