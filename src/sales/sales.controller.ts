import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('getAll')
  async getAll() {
    return await this.salesService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    const data = await this.salesService.getOne(id);

    if (!data) {
      throw new NotFoundException({
        message: 'Sale not found',
        error: 'No sale found with the provided ID',
      });
    }
    return data;
  }
}
