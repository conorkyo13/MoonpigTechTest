
class CardView {
    
    formatCards(cards: any) {
        return cards.map((card) => ({
            title: card.title,
            imageUrl: card.imageUrl,
            url: card.url
        })); 
    }
}

export default CardView;