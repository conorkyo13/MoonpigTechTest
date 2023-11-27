import * as express from "express";
import CardModel from "../models/CardModel";
import CardView from "../views/CardView";

class CardController {
    private cardModel: CardModel;
    private cardView: CardView;
  
    constructor(cardModel: CardModel, cardView: CardView) {
      this.cardModel = cardModel;
      this.cardView = cardView;
    }

    async getCards(req, res): Promise<void> {
      try {
        let cards = this.cardModel.getAllCards();
        let formattedCards = this.cardView.formatCards(cards);
        res.status(200).json(formattedCards);
      } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
      
    }

    async getCardById(req, res): Promise<void> {
      let { cardId, sizeId } = req.params;
      try {
        let card = this.cardModel.getCardById(cardId, sizeId);
        res.status(200).json(card);
      } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
    
}

export default CardController;