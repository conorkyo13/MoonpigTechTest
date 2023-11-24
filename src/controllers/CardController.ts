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
}

export default CardController;