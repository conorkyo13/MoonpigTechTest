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

    getAllCards(): { title: string; imageUrl: string; url: string }[] {
      if (this.cardsData.length === 0) {
        console.log("Warning: empty cards data");
        return [{
          title: '',
          imageUrl: '',
          url: ''
        }];
      }
        return this.cardsData.map(card => ({
          title: card.title ? card.title : '',
          imageUrl: this.getCardImageUrl(card.pages[0].templateId),
          url: card.id ? `/cards/${card.id}` : ''
        }));
    }

    getCardById(cardId: string, sizeId: string) {
      let card = this.cardsData.find(card => card.id === cardId);
      if (!card) {
        throw new Error('Card not found');
      }

      let availableSizes = this.getAvailableSizes(card);
      let selectedSize = sizeId ? this.sizesData.find(size => size.id === sizeId) : null;
      let price = this.calculatePrice(card.basePrice, selectedSize?.priceMultiplier);

      if (sizeId && !availableSizes.some(size => size.id === sizeId)) {
        throw new Error('Selected size not available');
      }

      return {
        title: card.title,
        size: selectedSize ? selectedSize.id : 'md',
        availableSizes: availableSizes,
        imageUrl: this.getCardImageUrl(card.pages[0].templateId),
        price: `£${price.toFixed(2)}`,
        pages: this.getCardPages(card)
      };
    
    }

    getCardImageUrl(templateId: string): string {
      let template = this.templateData.find(template => template.id === templateId);
      return template ? template.imageUrl : '';
    }

    calculatePrice(basePrice: number, multiplier: number) {
      return (basePrice * (multiplier || 1)) / 100; 
    }
  
    getAvailableSizes(card: Card) {
      let availableSizes = this.sizesData
      .filter(size => card.sizes.includes(size.id))
      .map(size => ({
        id: size.id,
        title: size.title
      }));

      return availableSizes;
    }

    getCardPages(card: Card) {
      let cardPages = card.pages.map(page => {
        let template = this.templateData.find(template => template.id === page.templateId);
    
        if (template) {
          return {
            title: page.title,
            width: template.width,
            height: template.height,
            imageUrl: template.imageUrl, 
          };
        }
    
        return {
          title: page.title,
          width: 0, 
          height: 0, 
          imageUrl: '', 
        };
      });
    
      return cardPages;
    } 

}

export default CardModel;