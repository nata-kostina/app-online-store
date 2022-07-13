class CartView {
  private cart: HTMLSpanElement;
  
  constructor() {
    this.cart = document.createElement('span');
    this.cart.classList.add('quantity-icon','cart__quantity-quantity');
    this.cart.innerHTML = '0 ';
  }

  getCartElement(): HTMLSpanElement {
    return this.cart;
  }
  
  render(quantity: number): void{
    this.cart.innerHTML = quantity.toString();
  }
  reset(): void {
    this.cart.innerHTML = '0';
  }
}

export default CartView;