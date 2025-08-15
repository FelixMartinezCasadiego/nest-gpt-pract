import { Controller } from '@nestjs/common';
import { SamAgentService } from './sam-agent.service';

@Controller('sam-agent')
export class SamAgentController {
  constructor(private readonly samAgentService: SamAgentService) {}
}
