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

  interface Sizes {
    id: string;
    title: string;
    priceMultiplier: number;
  }

  interface Template {
    id: string;
    width: number;
    height: number;
    imageUrl: string;
  }


class CardModel {
    private cardsData: Card[];
    private sizesData: Sizes[];
    private templateData: Template[];

    constructor(cardsData: Card[], sizesData: Sizes[], templateData: Template[]) {
        this.cardsData = cardsData;
        this.sizesData = sizesData;
        this.templateData = templateData;
    }

    getCardImageUrl(templateId: string): string {
        let template = this.templateData.find(template => template.id === templateId);
        return template ? template.imageUrl : '';
    }

    getAllCards(): { title: string; imageUrl: string; url: string }[] {
        return this.cardsData.map(card => ({
          title: card.title,
          imageUrl: this.getCardImageUrl(card.pages[0].templateId),
          url: `/cards/${card.id}`
        }));
      }

}

export default CardModel;