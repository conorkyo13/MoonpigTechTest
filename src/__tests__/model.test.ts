import * as request from 'supertest'
import CardModel from '../models/CardModel';

describe('CardModel', () => {
  
  const cardsData = [
    { id: '1', title: 'Card 1', sizes: ['s', 'm', 'l'], basePrice: 200, pages: [{ title: "front cover", templateId: "template1"}] },
    { id: '2', title: 'Card 2', sizes: ['s', 'm'], basePrice: 300, pages: [{ title: "back cover", templateId: "template2"}] },
    
  ];

  const sizesData = [
    { id: 'sm', title: 'Small', priceMultiplier: 1.5 },
    { id: 'md', title: 'Medium', priceMultiplier: 2 },
    
  ];

  const templatesData = [
    { id: 'template1', width: 300, height: 600, imageUrl: '/front.jpg' },
    { id: 'template2', width: 300, height: 600, imageUrl: ''},
    
  ];

  const cardModel = new CardModel(cardsData, sizesData, templatesData);

  it('should get all cards with correct structure', () => {
    const allCards = cardModel.getAllCards();
    expect(allCards).toHaveLength(cardsData.length);
    expect(allCards[0]).toHaveProperty('title');
    expect(allCards[0]).toHaveProperty('imageUrl');
    expect(allCards[0]).toHaveProperty('url');
  });

  it('should get title with "Card 1", imageURL with "/front.jpg" and url of "/cards/1"', () => {
    const allCards = cardModel.getAllCards();
    expect(allCards[0].title).toBe('Card 1');
    expect(allCards[0].imageUrl).toBe('/front.jpg');
    expect(allCards[0].url).toBe('/cards/1');
  });

  it('should get title with "Card 2", imageURL with "" and url of "/cards/2"', () => {
    const allCards = cardModel.getAllCards();
    expect(allCards[1].title).toBe('Card 2');
    expect(allCards[1].imageUrl).toBe('');
    expect(allCards[1].url).toBe('/cards/2');
  });
  
});

