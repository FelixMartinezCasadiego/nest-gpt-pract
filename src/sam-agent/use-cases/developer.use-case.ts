import { Agent, run } from '@openai/agents';

/* Tools */
import { webSearchToolGoogle } from '../tools';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface Options {
  prompt: string;
  conversationId: string;
  model?: string;
  tools?: string[];
}

const MAX_HISTORY_SIZE = 10;

const conversationHistory = new Map<string, Message[]>();

export const developerUseCase = async (options: Options) => {
  const { prompt, conversationId, model = 'gpt-4o-mini' } = options;

  if (!prompt.trim()) {
    throw new Error('The prompt cannot be empty.');
  }

  try {
    const history = conversationHistory.get(conversationId) || [];

    const agent = new Agent({
      name: 'Developer Agent',
      model: model,
      tools: [webSearchToolGoogle],
      instructions: `
        You are an expert software development assistant.
        Your role is to help developers with their technical queries,
        providing clean code, best practices, and clear explanations.

        If you don't have enough information to respond, search the web.

        Conversation context: ${conversationId}

        Additional instructions: ${prompt}
      `,
    });

    const promptWithHistory = [
      ...history.map((entry) => `${entry.role}: ${entry.content}`),
      `user: ${prompt}`,
    ].join('\n');

    const result = await run(agent, promptWithHistory);
    const agentDeveloperReply =
      result.finalOutput || 'No se recibió una respuesta válida.';

    // * Create conversation responses
    const response: Message[] = [
      { role: 'user', content: prompt, timestamp: new Date().toISOString() },
      {
        role: 'assistant',
        content: agentDeveloperReply,
        timestamp: new Date().toISOString(),
      },
    ];

    // * Update conversation history
    const updatedHistory = [...history, ...response];
    conversationHistory.set(conversationId, [...history, ...response]);

    if (updatedHistory.length > MAX_HISTORY_SIZE) {
      conversationHistory.set(
        conversationId,
        updatedHistory.slice(updatedHistory.length - MAX_HISTORY_SIZE),
      );
    } else {
      conversationHistory.set(conversationId, updatedHistory);
    }

    const agentResponse = {
      output: result.finalOutput,
      conversationId,
      messageCount: history.length + 2,
      timestamp: new Date().toISOString(),
    };

    console.log(agentResponse);

    return agentResponse.output;
  } catch (error) {
    console.error('Error in developer use case:', error);
    throw new Error(`Failed to process developer request: ${error.message}`);
  }
};
