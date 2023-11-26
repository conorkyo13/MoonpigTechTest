
class jsonFetcher {
    private data: any;

    constructor(private url: string) {
        this.data = null;
    }

    async fetchData(): Promise<void> {
      try {
        const response = await fetch(this.url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        this.data = await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getData(): any {
      return this.data;
    }
}

export default jsonFetcher;
