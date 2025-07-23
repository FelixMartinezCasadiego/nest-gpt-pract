import { Body, Controller, Post } from '@nestjs/common';

/* Services */
import { GptService } from './gpt.service';

/* Dtos */
import { OrthographyDto } from './dtos';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    return orthographyDto;
    // return this.gptService.orthographyCheck();
  }
}
