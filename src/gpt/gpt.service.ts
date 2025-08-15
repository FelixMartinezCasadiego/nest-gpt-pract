import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';

/* Use cases */
import {
  audioToTextUseCase,
  developerUseCase,
  imageGenerationGetterUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,
  orthographyUseCase,
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
  textToAudioGetterUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './use-cases';

/* Dtos */
import {
  AudioToTextDto,
  JavascriptDeveloperDto,
  ImageGenerationDto,
  ImageVariationDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // use cases
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }

  async translateText({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, { prompt, lang });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async textToAudioGetter(fileId: string) {
    return await textToAudioGetterUseCase(fileId);
  }

  async audioToText(
    audioFile: Express.Multer.File,
    audioToTextDto: AudioToTextDto,
  ) {
    const { prompt } = audioToTextDto;

    return await audioToTextUseCase(this.openai, { audioFile, prompt });
  }

  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return imageGenerationUseCase(this.openai, imageGenerationDto);
  }

  async imageGenerationGetter(fileName: string) {
    return await imageGenerationGetterUseCase(fileName);
  }

  async imageVariation({ baseImage }: ImageVariationDto) {
    return imageVariationUseCase(this.openai, { baseImage });
  }

  async javascriptDeveloper({
    prompt,
    conversationId,
  }: JavascriptDeveloperDto) {
    return await developerUseCase(this.openai, { prompt, conversationId });
  }
}
