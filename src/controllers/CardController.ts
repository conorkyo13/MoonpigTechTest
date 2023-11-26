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
        const cards = this.cardModel.getAllCards();
        //const formattedCards = this.cardView.formatCards(cards);
        res.json(cards);
      } catch(error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
    
}

export default CardController;