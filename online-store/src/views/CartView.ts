import { EventHandler, IProduct } from "../types/types";
import ProductView from './ProductView';

class CartView {
  private quantity: HTMLSpanElement;
  constructor(handler: EventHandler) {
       this.quantity = document.querySelector('.cart__quantity') as HTMLSpanElement;
  }
  
  render(quantity: number): void{
    this.quantity.innerHTML = quantity.toString();
  }

}

export default CartView;