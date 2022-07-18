import ProductView from '../views/ProductView';
import { ICartProduct, IProduct } from '../types/types';

describe('highlightProductsInCart', () => {
  const mockProduct: IProduct = {
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
    "quantity": '74'
  }
  const product = new ProductView(() => { return }, mockProduct);
  const element = product.getProductElement();
  const btnCart = element.querySelector('.btn-cart') as HTMLSpanElement;

   it('should remove highlighting', () => {
    const mockCart: ICartProduct[] = [];
    product.highlightProductsInCart(mockCart);

    expect(btnCart.classList.contains('active')).toBe(false);
   });

  it('should add highlighting', () => {
    const mockCart: ICartProduct[] = [{
      id: "00000"
    },];
    product.highlightProductsInCart(mockCart);

    expect(btnCart.classList.contains('active')).toBe(true);
  })
});


describe('highlightFavourites', () => {
  const mockProduct: IProduct = {
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
    "quantity": '74'
  }
  const product = new ProductView(() => { return }, mockProduct);
  const element = product.getProductElement();
  const btnCart = element.querySelector('.btn-cart') as HTMLSpanElement;

   it('should remove highlighting', () => {
    const mockCart: ICartProduct[] = [];
    product.highlightProductsInCart(mockCart);

    expect(btnCart.classList.contains('active')).toBe(false);
   });

  it('should add highlighting', () => {
    const mockCart: ICartProduct[] = [{
      id: "00000"
    },];
    product.highlightProductsInCart(mockCart);

    expect(btnCart.classList.contains('active')).toBe(true);
    
  })

});