import { Agent, run, tool } from '@openai/agents';
import { z } from 'zod';

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

const webSearchToolGoogle = tool({
  name: 'web_search',
  description: 'Search for information on the web using Google',
  parameters: z.object({ query: z.string() }),
  execute: async (input) => {
    console.log(
      'Buscando información en internet para la consulta:',
      input.query,
    );

    try {
      const apiKey = process.env.GOOGLE_API_KEY;
      const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(input.query)}`,
      );

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const results = data.items.slice(0, 3).map((item: any) => ({
          title: item.title,
          snippet: item.snippet,
          link: item.link,
        }));

        return `Resultados de búsqueda para "${input.query}":\n\n${results
          .map(
            (r, i) => `${i + 1}. **${r.title}**\n   ${r.snippet}\n   ${r.link}`,
          )
          .join('\n\n')}`;
      } else {
        return `No se encontraron resultados para "${input.query}".`;
      }
    } catch (error) {
      console.error('Error in web search:', error);
      return `Error al buscar "${input.query}": ${error.message}`;
    }
  },
});

const MAX_HISTORY_SIZE = 10;

const conversationHistory = new Map<string, Message[]>();

export const developerUseCase = async (options: Options) => {
  const { prompt, conversationId, model = 'gpt-4o-mini' } = options;

  try {
    const history = conversationHistory.get(conversationId) || [];

    const agent = new Agent({
      name: 'Developer Agent',
      model: model,
      tools: [webSearchToolGoogle],
      instructions: `
        Eres un asistente experto en desarrollo de software. 
        Tu rol es ayudar a los desarrolladores con sus consultas técnicas,
        proporcionando código limpio, buenas prácticas y explicaciones claras.

        Si no tienes suficiente información para responder, busca en la web.
        
        Contexto de la conversación: ${conversationId}
        
        Instrucciones adicionales: ${prompt}
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
