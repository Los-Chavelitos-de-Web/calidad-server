import { Body, Controller, Post } from '@nestjs/common';
import { PayService } from './pay.service';
import { ProductPay } from 'src/models/Product';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Post()
  payment(@Body() correo: string, @Body() prods: ProductPay[]) {
    return this.payService.createPreference(correo, prods);
  }
}
