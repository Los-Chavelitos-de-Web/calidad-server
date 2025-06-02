import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PayModule } from './pay/pay.module';
import { DescribeModule } from './describe/describe.module';
import { SalesModule } from './sales/sales.module';
import { ReservasModule } from './reservas/reservas.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), ProductsModule, AuthModule, UsersModule, JwtModule, PayModule, DescribeModule, SalesModule, ReservasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
