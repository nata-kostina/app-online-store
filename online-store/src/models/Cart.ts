import { Actions,  Handler, ICartProduct, Messages } from '../types/types';
import Modal from './Modal';
class Cart {
  private onModelUpdated: Handler;
  private cart: ICartProduct[];
  private cartLimit = 20;
  constructor(handler: Handler) {
    this.cart = [];
    this.onModelUpdated = handler;
  }

  public toggleProduct(productId: string): void {
    const product = this.cart.find(product => product.id === productId);
    if (product) {
      this.deleteFromToCart(product);
    }
    else
      this.addToCart({ id: productId });
  }

  private deleteFromToCart(product: ICartProduct): void {
    this.cart = this.cart.filter(p => p.id != product.id);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_CART);
  }

  public addToCart(product: ICartProduct): void {
    if (this.cart.length >= this.cartLimit) {
      Modal.getInstance().showModal(Messages.FULL_CART);
    }
    else {
      this.cart.push(product);
      this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_CART);
    }
  }

  public getQuantity(): number {
    return this.cart.length;
  }

  public getProducts(): ICartProduct[] {
    return this.cart;
  }

  public setProducts(products: ICartProduct[]): void {
    this.cart.push(...products);
  }

  public reset(): void {
    this.cart = [];
  }

}

export default Cart;