import { Module } from '@nestjs/common';
import { DescribeController } from './describe.controller';
import { DescribeService } from './describe.service';

@Module({
  controllers: [DescribeController],
  providers: [DescribeService]
})
export class DescribeModule {}
