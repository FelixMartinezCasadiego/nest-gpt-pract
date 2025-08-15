import { Module } from '@nestjs/common';
import { SamAgentService } from './sam-agent.service';
import { SamAgentController } from './sam-agent.controller';

@Module({
  controllers: [SamAgentController],
  providers: [SamAgentService],
})
export class SamAgentModule {}
