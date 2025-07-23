import { Injectable } from '@nestjs/common';
import { orthographyUseCase } from './use-cases';

@Injectable()
export class GptService {
  // use cases
  async orthographyCheck() {
    return await orthographyUseCase();
  }
}
