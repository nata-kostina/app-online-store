import { Actions, Handler, ICartProduct } from '../types/types';
import Modal from './Modal';
class Cart {
  private onModelUpdated: Handler;
  private cart: ICartProduct[];
  constructor(handler: Handler) {
    this.cart = [];
    this.onModelUpdated = handler;
  }

  toggleProduct(productId: string): void {
    const product = this.cart.find(product => product.id === productId);
    if (product) {
      this.deleteFromToCart(product);
    }
    else
      this.addToCart({ id: productId, title: "tets", quantity: 1 });   
  }

  private deleteFromToCart(product: ICartProduct): void {
    this.cart = this.cart.filter(p => p.id != product.id);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_CART);
  }

  private addToCart(product: ICartProduct): void {
    if (this.cart.length >= 2) {
      const modal = new Modal(this.onModelUpdated, 'Cart is full');
      modal.showModal();      
    }
    else{
      this.cart.push(product);
      this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_CART);
    }
  }

  getQuantity(): number {
    return this.cart.length;
  }

}

export default Cart;