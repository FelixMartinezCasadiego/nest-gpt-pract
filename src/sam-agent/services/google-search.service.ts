export class GoogleSearchService {
  constructor(
    private readonly apiKey: string,
    private readonly searchEngineId: string,
  ) {}

  async search(query: string) {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.searchEngineId}&q=${encodeURIComponent(query)}`,
    );

    const data = await response.json();

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
