export class GoogleSearchService {
  constructor() {}

  async search(query: string) {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`,
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(
        `Google API error: ${data.error.code} - ${data.error.message}`,
      );
    }

    if (!data.items?.length) {
      return [];
    }

    return data.items.slice(0, 3).map((item: any) => ({
      title: item.title,
      snippet: item.snippet,
      link: item.link,
    }));
  }
}
