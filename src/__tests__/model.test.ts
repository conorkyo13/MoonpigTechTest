import CardModel from '../models/CardModel';

describe('CardModel', () => {
  
  const cardsData = [
    { id: '1', title: 'Card 1', sizes: ['sm', 'md', 'lg'], basePrice: 200, pages: [{ title: "front cover", templateId: "template1"}] },
    { id: '2', title: 'Card 2', sizes: ['sm', 'md'], basePrice: 300, pages: [{ title: "back cover", templateId: "template2"}] },
    
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

  describe('getAllCards()', () => {
    test('should get all cards with correct structure', () => {
      let allCards = cardModel.getAllCards();
      expect(allCards).toHaveLength(cardsData.length);
      expect(allCards[0]).toHaveProperty('title');
      expect(allCards[0]).toHaveProperty('imageUrl');
      expect(allCards[0]).toHaveProperty('url');
    });
  
    test('if there is no cards data should return an empty array stucture', () => {
      let emptyCardModel = new CardModel([], sizesData, templatesData);
      let allCards = emptyCardModel.getAllCards();
      expect(allCards[0]).toHaveProperty('title', '');
      expect(allCards[0]).toHaveProperty('imageUrl', '');
      expect(allCards[0]).toHaveProperty('url', '');
    });
  
    test('if there is no template data should return an empty imageUrl string', () => {
      let emptyTemplateModel = new CardModel(cardsData, sizesData, []);
      let allCards = emptyTemplateModel.getAllCards();
      expect(allCards[0]).toHaveProperty('title', 'Card 1');
      expect(allCards[0]).toHaveProperty('imageUrl', '');
      expect(allCards[0]).toHaveProperty('url', '/cards/1');
    });
  
    test('should get title with "Card 1", imageURL with "/front.jpg" and url of "/cards/1"', () => {
      let allCards = cardModel.getAllCards();
      expect(allCards[0]).toHaveProperty('title', 'Card 1');
      expect(allCards[0]).toHaveProperty('imageUrl', '/front.jpg');
      expect(allCards[0]).toHaveProperty('url', '/cards/1');
    });
  
    test('should get title with "Card 2", imageURL with "" and url of "/cards/2"', () => {
      let allCards = cardModel.getAllCards();
      expect(allCards[1]).toHaveProperty('title', 'Card 2');
      expect(allCards[1]).toHaveProperty('imageUrl', '');
      expect(allCards[1]).toHaveProperty('url', '/cards/2');
    });
  });
 
  describe('getCardById()', () => {
    test('should get card details by ID with size', () => {
      let cardDetails = cardModel.getCardById('1', 'sm');
      expect(cardDetails).toHaveProperty('title', 'Card 1');
      expect(cardDetails).toHaveProperty('size', 'sm');
      expect(cardDetails).toHaveProperty('price', '£3.00');
    });
  
    test('should throw error "Selected size not available"', () => {
      expect(() => cardModel.getCardById('1', 'tiny')).toThrow(); 
    });
  
    test('should throw error "Card not found"', () => {
      expect(() => cardModel.getCardById('4', 'md')).toThrow(); 
    });

    test('should calulate price correctly', () => {
      let cardDetails = cardModel.getCardById('1', 'md');
      expect(cardDetails).toHaveProperty('price', '£4.00');
    })
  });

  describe('getCardImageUrl()', () => {
    test('returns the correct image URL for a valid templateId', () => {
      expect(cardModel.getCardImageUrl('template1')).toBe('/front.jpg');
    });

    test('handles invalid templateId', () => {
      expect(cardModel.getCardImageUrl('template44')).toBe('');
    });
  });

  describe('calculatePrice()', () => {
    test('calculates price correctly with a valid multiplier', () => {
      expect(cardModel.calculatePrice(200,2)).toBe(4);
      expect(cardModel.calculatePrice(100,1)).toBe(1);
      expect(cardModel.calculatePrice(10,10)).toBe(1);
    });

    test('handles scenarios with no multiplier provided', () => {
      expect(cardModel.calculatePrice(200,null)).toBe(2);
      expect(cardModel.calculatePrice(400,null)).toBe(4);
    });
  });

  describe('getAvailableSizes()', () => {
    test('filters and retrieves available sizes correctly', () => {
      let mockCard = { id: '2', title: 'Card 2', sizes: ['sm', 'md'], basePrice: 300, pages: [{ title: "back cover", templateId: "template2"}] };
      expect(cardModel.getAvailableSizes(mockCard)[0]).toHaveProperty('id', 'sm');
      expect(cardModel.getAvailableSizes(mockCard)[0]).toHaveProperty('title', 'Small');
      expect(cardModel.getAvailableSizes(mockCard)[1]).toHaveProperty('id', 'md');
      expect(cardModel.getAvailableSizes(mockCard)[1]).toHaveProperty('title', 'Medium');
    });
  });

  describe('getCardPages()', () => {

    const templateData = [
      { id: 'template1', width: 300, height: 600, imageUrl: '/image1.jpg' },
      { id: 'template2', width: 400, height: 800, imageUrl: '/image2.jpg' },
    ];

    const mockCard = {
      id: 'card1',
      title: 'Sample Card',
      sizes: ['size1', 'size2'],
      basePrice: 100,
      pages: [
        { title: 'Front Cover', templateId: 'template1' },
        { title: 'Inside Left', templateId: 'template2' },
      ],
    };

    const cardModel2 = new CardModel([], [], templateData);

    test('formats card pages accurately based on available templateData', () => {
      let formattedPages = cardModel2.getCardPages(mockCard);
      expect(formattedPages).toEqual([
        { title: 'Front Cover', width: 300, height: 600, imageUrl: '/image1.jpg' },
        { title: 'Inside Left', width: 400, height: 800, imageUrl: '/image2.jpg' },
      ]);
    });

    test('handles different scenarios in templateData', () => {
      let modifiedCard = { ...mockCard, pages: [...mockCard.pages, { title: 'Invalid Page', templateId: 'invalidTemplate' }] };
      let formattedPages = cardModel2.getCardPages(modifiedCard);

      expect(formattedPages).toEqual([
        { title: 'Front Cover', width: 300, height: 600, imageUrl: '/image1.jpg' },
        { title: 'Inside Left', width: 400, height: 800, imageUrl: '/image2.jpg' },
        { title: 'Invalid Page', width: 0, height: 0, imageUrl: '' }, 
      ]);
    });
  });
  
  
});

