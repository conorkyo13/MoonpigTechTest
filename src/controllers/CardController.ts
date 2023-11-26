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
        res.status(500).json({ error: 'Internal server error' });
      }
    }
    
}

export default CardController;