import { Body, Controller, Post } from '@nestjs/common';
import { PayService } from './pay.service';
import { ProductPay } from 'src/models/Product';
import { PayData } from 'src/types/PayTypes';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) { }

  @Post()
  payment(@Body() payData: PayData) {
    return this.payService.createPreference(payData.correo, payData.items);
  }
}
