import Cart from "../models/Cart";
import { ICartProduct } from "../types/types"
import Modal from '../models/Modal';

describe ('getQuantity method', () => {
  const cart = new Cart(()=> {return});
  it ('should return quantity of products in cart', () => {
    const mockCartProducts: ICartProduct[] = [
      {id: '0'},
      {id: '1'}
    ];  
    cart.setProducts(mockCartProducts);
    expect(cart.getQuantity()).toBe(2);
  });
})

describe('setProducts method', () => {
  const cart = new Cart(()=> {return});
  const mockCartProducts: ICartProduct[] = [];
  mockCartProducts.length = 21;
  cart.setProducts(mockCartProducts);

  const spy = jest.spyOn(Modal.getInstance() , 'showModal');
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it ('should call Modal.showModal() when quantity in cart > 20', () => {
    cart.addToCart({id: '008'});
    expect(spy).toHaveBeenCalled();
  })
})