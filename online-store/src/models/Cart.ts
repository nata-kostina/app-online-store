import { Handler, ICartProduct } from '../types/types';
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
    this.onModelUpdated('TOGGLE-PRODUCT-IN-CART');
  }

  private deleteFromToCart(product: ICartProduct): void {
    this.cart = this.cart.filter(p => p.id != product.id);
  }

  private addToCart(product: ICartProduct): void {
    this.cart.push(product);
  }

  getQuantity(): number {
    return this.cart.length;
  }

}

export default Cart;