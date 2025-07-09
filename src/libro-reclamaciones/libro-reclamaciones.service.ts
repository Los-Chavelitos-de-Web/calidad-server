import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LibroReclamacionesService {

    constructor (private readonly prisma: PrismaService) {}

    getAll() {
    }

}
