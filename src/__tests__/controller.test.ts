import { Request, Response } from 'express';
import CardModel from '../models/CardModel';
import CardView from '../views/CardView';
import CardController from '../controllers/CardController';

describe('CardController', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn(() => mockResponse)
  } as unknown as Response;

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
  const cardView = new CardView();
  const cardController = new CardController(cardModel, cardView);

  test('should get all cards', async () => {
    await cardController.getCards(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalled();
    
  });

  test('should get card details by ID', async () => {
    mockRequest.params = { cardId: '1', sizeId: 'md' };
    await cardController.getCardById(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalled();
  });

  
});