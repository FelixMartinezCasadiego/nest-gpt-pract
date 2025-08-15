import { Test, TestingModule } from '@nestjs/testing';
import { SamAgentService } from './sam-agent.service';

describe('SamAgentService', () => {
  let service: SamAgentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SamAgentService],
    }).compile();

    service = module.get<SamAgentService>(SamAgentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
