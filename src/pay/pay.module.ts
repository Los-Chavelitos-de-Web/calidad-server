import { Module } from '@nestjs/common';
import { PayController } from './pay.controller';
import { PayService } from './pay.service';
import { PrismaService } from '../../src/prisma.service';

@Module({
  controllers: [PayController],
  providers: [PayService, PrismaService],
})
export class PayModule { }
