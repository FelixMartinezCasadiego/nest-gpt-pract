import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  const completions = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
        la respuesta debe de ser en formato markdown,
        los pros y contras deben de estar en una lista,
        `,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-4.1-nano',
    max_tokens: 600,
  });

  console.log('Completions:', {
    prompt_tokens: completions.usage?.prompt_tokens,
    completion_tokens: completions.usage?.completion_tokens,
    total_tokens: completions.usage?.total_tokens,
  });

  return completions.choices[0].message.content;
};
