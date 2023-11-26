import * as request from 'supertest'
import { app, fetchDataAndInitiateApp } from '../server'; 

beforeAll(async () => {
  await fetchDataAndInitiateApp(); 
});

describe('Testing express endpoints', () => {

  test('GET /cards should return a list of cards', async () => {
    const response = await request(app).get('/cards');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Assuming the response is an array
    // Additional assertions as needed
  });

  
});