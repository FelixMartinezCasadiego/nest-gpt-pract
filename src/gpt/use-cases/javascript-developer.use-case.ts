import OpenAI from 'openai';

interface Options {
  prompt: string;
  conversationId: string;
}

const MAX_HISTORY = 10;
const conversations: Record<
  string,
  OpenAI.Chat.Completions.ChatCompletionMessageParam[]
> = {};

export const developerUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, conversationId } = options;

  if (!conversations[conversationId]) {
    conversations[conversationId] = [
      {
        role: 'system',
        content: `
        Eres un asistente experto en desarrollo web y mobile. Mas enfocado en javascript y typescript. 
          
        Brindando respuestas con clean code, ofreciendo soluciones simples y soluciones escalables
        `,
      },
    ];
  }

  conversations[conversationId].push({ role: 'user', content: prompt });

  const messagesToSend = [
    conversations[conversationId][0],
    ...conversations[conversationId].slice(-MAX_HISTORY),
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1-nano',
    messages: messagesToSend,
  });

  const assistantMessage = completion.choices[0].message;

  conversations[conversationId].push(assistantMessage);

  return assistantMessage.content;
};
