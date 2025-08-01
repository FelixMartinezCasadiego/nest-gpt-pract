import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (openai: OpenAI, options: Options) => {
  const { lang, prompt } = options;

  const completions = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        Traduce el siguiente texto al idioma ${lang}:${prompt}
        `,
      },
    ],
    model: 'gpt-4.1-nano',
  });

  console.log('Completions:', {
    prompt_tokens: completions.usage?.prompt_tokens,
    completion_tokens: completions.usage?.completion_tokens,
    total_tokens: completions.usage?.total_tokens,
  });

  return { message: completions.choices[0].message.content };
};
