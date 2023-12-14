import * as express from "express";
import DataService from './services/DataService';

export const app = express();
app.set('json spaces', 2);

const cardsURL = 'https://moonpig.github.io/tech-test-node-backend/cards.json';
const sizesURL = 'https://moonpig.github.io/tech-test-node-backend/sizes.json';
const templatesURL = 'https://moonpig.github.io/tech-test-node-backend/templates.json';

const dataService = new DataService(cardsURL, sizesURL, templatesURL);

dataService.initiateAppEndpoints(app);

