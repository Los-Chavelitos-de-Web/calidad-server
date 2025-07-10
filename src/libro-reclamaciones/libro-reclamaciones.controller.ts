import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LibroReclamacionesService } from './libro-reclamaciones.service';
import { LibroReclamacionesCreate } from 'src/models/LibroReclamaciones';

@Controller('libro-reclamaciones')
export class LibroReclamacionesController {

    constructor (private readonly libroService: LibroReclamacionesService) {}

    @Get()
    getAll() {
        return this.libroService.getAll();
    }

    @Post()
    create(@Body() libro: LibroReclamacionesCreate) {
        return this.libroService.create(libro);
    }

    @Put(':id')
    update(@Param('id') id, @Body() libro: LibroReclamacionesCreate) {
        return this.libroService.update(parseInt(id), libro);
    }

    @Delete(':id')
    delete(@Param('id') id) {
        return this.libroService.delete(parseInt(id));
    }

}
