import { Body, Controller, Post } from '@nestjs/common';
import { ProductPromptType } from 'src/types/promptTypes';
import { describe } from 'src/utils/getPrompt';

@Controller('describe')
export class DescribeController {

  @Post()
  descibre(@Body() p: ProductPromptType) {
    return describe(p);
  }
}
