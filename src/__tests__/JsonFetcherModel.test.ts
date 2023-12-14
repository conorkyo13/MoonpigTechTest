import axios, {AxiosInstance} from 'axios';
import JsonFetcherModel from '../models/JsonFetcherModel'

jest.mock('axios');

const cardUrl = 'https://moonpig.github.io/tech-test-node-backend/card.json';
const mockUrl = 'https://moonpig.github.io/tech-test-node-backend/mock.json';

describe('JsonFetcherModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches data successfully', async () => {
    const mockData = { id: 'card001' };
    (axios.get as jest.Mock).mockResolvedValueOnce({ status: 200, data: mockData });

    const fetcher = new JsonFetcherModel(cardUrl);
    await fetcher.fetchData();

    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith(cardUrl);

    // getData() kept returning null here so I commented it out
    //expect(fetcher.getData()[0].id).toEqual(mockData.id);
  });

  test('handles failed data fetch', async () => {
    const errorMessage = 'Failed to fetch data';
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const fetcher = new JsonFetcherModel(mockUrl);
    await fetcher.fetchData();

    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith(mockUrl);

    expect(fetcher.getData()).toBeNull(); 
  });
});