import * as request from 'supertest'
import { app, fetchDataAndInitiateApp } from '../server'; 

beforeAll(async () => {
  await fetchDataAndInitiateApp(); 
});

describe('Testing express endpoints', () => {

  test('returns a list of cards', async () => {
    const response = await request(app).get('/cards');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); 
  });

  test('returns matching card title', async () => {
    const response = await request(app).get('/cards/card001')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      title: 'card 1 title',
    }));
  });

  test('returns default size', async () => {
    const response = await request(app).get('/cards/card001')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      size: 'md',
    }));
  });

  test('returns correct size', async () => {
    const response = await request(app).get('/cards/card001/gt')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      size: 'gt',
    }));
  });

  test('returns correct imageUrl', async () => {
    const response = await request(app).get('/cards/card001/gt')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      imageUrl: '/front-cover-portrait-1.jpg',
    }));
  });

  test('returns non empty available sizes', async () => {
    const response = await request(app).get('/cards/card001/gt')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('availableSizes');
    expect(Array.isArray(response.body.pages)).toBe(true);
    expect(response.body.pages.length).toBeGreaterThan(0);
  });

  test('returns non empty pages', async () => {
    const response = await request(app).get('/cards/card001/gt')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('pages');
    expect(Array.isArray(response.body.pages)).toBe(true);
    expect(response.body.pages.length).toBeGreaterThan(0);
  });

  test('throws internal server error', async () => {
    const response = await request(app).get('/cards/card004')
    expect(response.status).toBe(500);
  });

  test('throws internal server error', async () => {
    const response = await request(app).get('/cards/card001/tiny')
    expect(response.status).toBe(500);
  });
  
});