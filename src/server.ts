import * as express from "express";
import jsonFetcher from "./jsonFetcher/jsonFetcher";
import CardModel from "./models/CardModel";
import CardView from "./views/CardView";
import CardController from "./controllers/CardController";

const cardsURL = 'https://moonpig.github.io/tech-test-node-backend/cards.json';
const sizesURL = 'https://moonpig.github.io/tech-test-node-backend/sizes.json';
const templatesURL = 'https://moonpig.github.io/tech-test-node-backend/templates.json';

export const app = express()
app.set('json spaces', 2);

// used an async function so I could wait for all the data to be fetched before moving on to the endpoint implementation
async function fetchDataAndInitiateApp() {
  try {
    const cardsData = new jsonFetcher(cardsURL);
    const sizesData = new jsonFetcher(sizesURL);
    const templatesData = new jsonFetcher(templatesURL);

    await Promise.all([
      cardsData.fetchData(),
      sizesData.fetchData(),
      templatesData.fetchData()
    ]);

    const cardModel = new CardModel(cardsData.getData(), sizesData.getData(), templatesData.getData());
    const cardView = new CardView();
    const cardController = new CardController(cardModel, cardView);

    app.get('/cards', async (req, res) => {
      // respond with a list of cards
      cardController.getCards(req, res);
    });

    app.get('/cards/:cardId/:sizeId?', async (req, res) => {
      // respond with card by id
      cardController.getCardById(req, res);
    });

  } catch(error) {
    console.log(error);
    throw(error);
  }
}

fetchDataAndInitiateApp();

export { fetchDataAndInitiateApp };