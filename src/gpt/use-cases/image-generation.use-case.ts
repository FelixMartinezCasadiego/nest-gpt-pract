import OpenAI from 'openai';
import { dowloandImageAsPng } from 'src/helpers';

interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt, maskImage, originalImage } = options;

  // todo: verificar original image

  const response = await openai.images.generate({
    prompt: prompt,
    model: 'dall-e-3',
    n: 1,
    size: '1024x1024',
    quality: 'standard',
    response_format: 'url',
  });

  console.log(response);

  if (!response.data || !response.data[0].url)
    return console.error('response.data === null');

  // * Save image in FS
  await dowloandImageAsPng(response.data[0].url);

  return {
    url: response.data[0].url,
    local: '',
    revised_prompt: response.data[0].revised_prompt,
  };
};
