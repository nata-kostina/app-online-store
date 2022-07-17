import Sort from '../models/Sort';
import AppModel from './../models/AppModel';
import { IProduct } from './../types/types';

const model = new AppModel(() => { return });
describe('getProducts method', () => {
  const mockData: IProduct[] = [{
    "id": "00000",
    "title": "NBG-18 Gloves for cycling",
    "shortDescription": "These gloves have been designed for cycling. Their texture allows a perfect evacuation of perspiration. The inside of the glove is padded and reduces the friction associated with the sport.",
    "category": "Cycling",
    "color": "Blue",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "year": "2019",
    "isBestseller": true,
    "imgUrl": "./assets/images/products/nbg-18-blue.jpg",
    "price": "19.90",
    "quantity": "74"
  },];

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );

  it('should return data', async () => {
    const data = await model.getProducts('some url');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toBe(mockData);
  })
})

describe('sortProducts()', () => {
  Sort.sortProducts = jest.fn();
  it('should call sortProducts() method from Sort class', () => {
    model.sortProducts();
    expect(Sort.sortProducts).toHaveBeenCalledTimes(1);
  })
})