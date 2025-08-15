import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

/* Dtos */
import { DeveloperDto } from './dtos';

/* Use Cases */
import { developerUseCase } from './use-cases';

@Injectable()
export class SamAgentService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // use cases

  async developerAgent(developerDto: DeveloperDto) {
    return await developerUseCase(developerDto);
  }
}
