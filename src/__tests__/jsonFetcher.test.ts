import axios, {AxiosInstance} from 'axios';
import jsonFetcher from '../jsonFetcher/jsonFetcher'

jest.mock('axios');

const mockUrl = 'https://moonpig.github.io/tech-test-node-backend/mock.json';

describe('jsonFetcher', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('handles failed data fetch', async () => {
    //let axiosMock = axios as jest.Mocked<typeof axios>; 
    //axiosMock.get.mockRejectedValueOnce(new Error('Failed to fetch data'));

    let fetcher = new jsonFetcher(mockUrl);
    await fetcher.fetchData();

    //expect(axiosMock.get).toHaveBeenCalledWith(mockUrl);
    expect(fetcher.getData()).toBeNull(); 
  });
});