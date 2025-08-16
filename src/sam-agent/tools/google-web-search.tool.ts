import { tool } from '@openai/agents';
import { z } from 'zod';

/* Services */
import { GoogleSearchService } from '../services';

const googleSearchService = new GoogleSearchService();

export const webSearchToolGoogle = tool({
  name: 'web_search',
  description: 'Search for information on the web using Google',
  parameters: z.object({ query: z.string() }),
  execute: async (input) => {
    console.log(
      'Buscando información en internet para la consulta:',
      input.query,
    );

    try {
      // * Google Api call
      const results = await googleSearchService.search(input.query);

      console.log('results:', results);

      if (results.length === 0) {
        return `No se encontraron resultados para "${input.query}".`;
      }

      return `Resultados de búsqueda para "${input.query}":\n\n${results
        .map(
          (r, i) => `${i + 1}. **${r.title}**\n   ${r.snippet}\n   ${r.link}`,
        )
        .join('\n\n')}`;
    } catch (error) {
      console.error('Error in web search:', error);
      return `Error al buscar "${input.query}": ${error.message}`;
    }
  },
});
