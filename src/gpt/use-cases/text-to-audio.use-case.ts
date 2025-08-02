import OpenAI from 'openai';

interface Options {
  prompt: string;
  voice?: string;
}

export const textToAudioUseCase = async (openai: OpenAI, options: Options) => {
  const { voice, prompt } = options;

  const voices = { nova: 'nova', alloy: 'alloy' };

  const selectedVoice = voices[voice ?? 'nova'] ?? 'nova';

  return { prompt, selectedVoice };
};
