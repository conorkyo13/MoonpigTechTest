interface Card {
  id: string;
  title: string;
  sizes: string[];
  basePrice: number;
  pages: {
    title: string;
    templateId: string;
  }[];
}

export default class jsonFetcher {
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

    filterData(type: string) {
      if (!this.data) {
        console.error('No data fetched yet');
        return [];
      }

      return this.data.filter((item: any) => {
        return item.type === type; 
      });
    }

    getData(): any {
      return this.data;
    }
}

export function getCardsEndpoint(cardData, templateData) {
  if (cardData === null || templateData === null) {
    console.log('Data not fetched yet');
    return {
      title: '',
      imageUrl: '',
      url: ''
    };
  }

  let cards = cardData.map((card) => {
    let template = templateData.find((template) => card.pages[0].templateId === template.id);
    return {
      title: card.title ? card.title : '',
      imageUrl: template ? template.imageUrl : '', 
      url: card.id ? `/cards/${card.id}` : ''
    };
  });

  return cards;
}