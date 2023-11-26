import axios from "axios";

class jsonFetcher {
    private data: any;

    constructor(private url: string) {
        this.data = null;
    }

    async fetchData(): Promise<void> {
      try {
        const response = await axios(this.url);
        if (response.status = 200) {
          this.data = response.data;
        }
        
        else {
          throw new Error('Failed to fetch data');
        }
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getData(): any {
      return this.data;
    }
}

export default jsonFetcher;
