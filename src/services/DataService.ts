import CardModel from '.././models/CardModel';
import CardView from '.././views/CardView';
import CardController from '.././controllers/CardController';
import JsonFetcherModel from '../models/JsonFetcherModel';

class DataService {
  private cardsData;
  private sizesData;
  private templatesData;
  private cardController;

  constructor(cardsURL: string, sizesURL: string, templatesURL: string) {
    this.cardsData = new JsonFetcherModel(cardsURL);
    this.sizesData = new JsonFetcherModel(sizesURL);
    this.templatesData = new JsonFetcherModel(templatesURL);

  }

  private async fetchData() {
    await Promise.all([
      this.cardsData.fetchData(),
      this.sizesData.fetchData(),
      this.templatesData.fetchData(),
    ]);
  }

  private initiateCardController() {
    const cardModel = new CardModel(this.cardsData.getData(), this.sizesData.getData(), this.templatesData.getData());
    const cardView = new CardView();
    return new CardController(cardModel, cardView);
  }

  public async initiateAppEndpoints(app) {
    try {
      await this.fetchData();
    
      this.cardController = this.initiateCardController();

      app.get('/cards', async (req, res) => {
        this.cardController.getCards(req, res);
      });

      app.get('/cards/:cardId/:sizeId?', async (req, res) => {
        this.cardController.getCardById(req, res);
      });
    } catch (error) {
      throw error;
    }
  }
}

export default DataService;