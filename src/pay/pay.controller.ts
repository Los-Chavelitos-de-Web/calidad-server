import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { PayService } from './pay.service';
import { PayData, PaySuccess } from '../../src/types/PayTypes';
import { Response } from 'express';

@ApiTags('Pay') // Categoría para agrupar los endpoints relacionados con pagos
@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Post()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiOperation({ summary: 'Crear una preferencia de pago' }) // Descripción breve del endpoint
  @ApiResponse({
    status: 201,
    description: 'Preferencia de pago creada exitosamente.',
  }) // Respuesta esperada
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para crear la preferencia de pago.',
  }) // Respuesta en caso de error
  payment(@Body() payData: PayData) {
    return this.payService.createPreference(payData.correo, payData.items);
  }

  @Get('success')
  @ApiOperation({ summary: 'Confirmar el éxito de un pago' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Pago confirmado exitosamente.' }) // Respuesta esperada
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para confirmar el pago.',
  }) // Respuesta en caso de error
  async successfulll(@Query() paySuccess: PaySuccess, @Res() res?: Response) {
    await this.payService.success(paySuccess.preference_id);

    const html = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Redirigiendo...</title>
          <script>
            setTimeout(function() {
              window.location.href = "${process.env.FRONT_URL}";
            }, 2500);
          </script>
        </head>
        <body>
          <h2>✅ Pago exitoso. Redirigiendo en breve...</h2>
        </body>
      </html>
    `;

    res?.send(html);
  }
}
