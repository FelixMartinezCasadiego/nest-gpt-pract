import { Injectable } from '@nestjs/common';

/* Use cases */
import { orthographyUseCase } from './use-cases';

/* Dtos */
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {
  // use cases
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyUseCase({ prompt: orthographyDto.prompt });
  }
}
