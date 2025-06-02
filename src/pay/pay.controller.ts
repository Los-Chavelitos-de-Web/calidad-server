import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PayService } from './pay.service';
import { PayData, PaySuccess } from '../../src/types/PayTypes';
import { AuthGuard } from '../../src/guards/auth/auth.guard';

@ApiTags('Pay') // Categoría para agrupar los endpoints relacionados con pagos
@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) { }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una preferencia de pago' }) // Descripción breve del endpoint
  @ApiResponse({ status: 201, description: 'Preferencia de pago creada exitosamente.' }) // Respuesta esperada
  @ApiResponse({ status: 400, description: 'Datos inválidos para crear la preferencia de pago.' }) // Respuesta en caso de error
  payment(@Body() payData: PayData) {
    return this.payService.createPreference(payData.correo, payData.items);
  }

  @Get('success')
  @ApiOperation({ summary: 'Confirmar el éxito de un pago' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Pago confirmado exitosamente.' }) // Respuesta esperada
  @ApiResponse({ status: 400, description: 'Datos inválidos para confirmar el pago.' }) // Respuesta en caso de error
  sucess(@Query() paySucess: PaySuccess) {
    return this.payService.success(paySucess.preference_id);
  }
}
