import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PayService } from './pay.service';
import { PayData, PaySuccess } from '../../src/types/PayTypes';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) { }

  @Post()
  payment(@Body() payData: PayData) {
    return this.payService.createPreference(payData.correo, payData.items);
  }

  @Get('success')
  sucess(@Query() paySucess: PaySuccess) {
    return this.payService.success(paySucess.preference_id);
  }
}
