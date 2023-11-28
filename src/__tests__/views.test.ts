import CardView from '../views/CardView';

describe('View Model', () => {

    const viewModel = new CardView();

    test('should format the cards correctly', () => {
        const cardsData = [
            { id: '1', title: 'Card 1', sizes: ['s', 'm', 'l'], basePrice: 200, pages: [{ title: "front cover", templateId: "template1"}] },
            { id: '2', title: 'Card 2', sizes: ['s', 'm'], basePrice: 300, pages: [{ title: "back cover", templateId: "template2"}] },
            
        ];
        
        let formattedCards = viewModel.formatCards(cardsData);
        expect(formattedCards).toHaveLength(2);
        expect(formattedCards[0]).toHaveProperty('title');
        expect(formattedCards[0]).toHaveProperty('imageUrl');
        expect(formattedCards[0]).toHaveProperty('url');
    })
})