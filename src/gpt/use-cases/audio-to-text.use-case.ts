import * as fs from 'fs';
import OpenAI from 'openai';

interface Options {
  prompt?: string;
  audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (openAi: OpenAI, options: Options) => {
  const { audioFile, prompt } = options;

  const response = await openAi.audio.transcriptions.create({
    model: 'gpt-4o-mini-transcribe',
    file: fs.createReadStream(audioFile.path),
    prompt: prompt, // debe ser el mismo idioma del audio
    language: 'es',
    response_format: 'json',
  });

  return response;
};
