import * as request from 'supertest'
import fetchMock from 'jest-fetch-mock';
import jsonFetcher from '../jsonFetcher/jsonFetcher'

const cardsURL = 'https://moonpig.github.io/tech-test-node-backend/cards.json';


describe('JSON Fetcher', () => {
    const validJsonFetcher = new jsonFetcher(cardsURL);
    const invalidJsonFetcher = new jsonFetcher('');

    fetchMock.enableMocks();
    
    test('it should fetch data with no error', async () => {
        try {
            await validJsonFetcher.fetchData();
            
            //fail('Expected the promise to reject, but it resolved.');
          } catch (error) {
            fail('Expected the promise to reject, but it resolved.');
            //expect(error).toBeDefined(); 
          }
    }) 

    test('it should fetch data with an error', async () => {
        try {
            await invalidJsonFetcher.fetchData();
            //expect()
          } catch (error) {
            
            expect(error).toBeDefined();
          }
    }) 

    
})