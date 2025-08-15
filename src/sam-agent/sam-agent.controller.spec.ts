import { Test, TestingModule } from '@nestjs/testing';
import { SamAgentController } from './sam-agent.controller';
import { SamAgentService } from './sam-agent.service';

describe('SamAgentController', () => {
  let controller: SamAgentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SamAgentController],
      providers: [SamAgentService],
    }).compile();

    controller = module.get<SamAgentController>(SamAgentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
