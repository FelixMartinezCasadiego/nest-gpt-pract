import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GptModule } from './gpt/gpt.module';
import { SamAgentModule } from './sam-agent/sam-agent.module';

@Module({
  imports: [ConfigModule.forRoot(), GptModule, SamAgentModule],
})
export class AppModule {}
