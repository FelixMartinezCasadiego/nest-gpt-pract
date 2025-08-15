import { Body, Controller, Post } from '@nestjs/common';
import { SamAgentService } from './sam-agent.service';

/* Dtos */
import { DeveloperDto } from './dtos';

@Controller('sam-agent')
export class SamAgentController {
  constructor(private readonly samAgentService: SamAgentService) {}

  @Post('developer-agent')
  developerAgent(@Body() developerMessageDto: DeveloperDto) {
    return this.samAgentService.developerAgent(developerMessageDto);
  }
}
