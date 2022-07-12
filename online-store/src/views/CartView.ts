class CartView {
  private cart: HTMLDivElement;
  constructor() {
    this.cart = document.createElement('div');
    this.cart.classList.add('cart');
    
    const quantity = document.createElement('span');
    quantity.classList.add('.cart__quantity');
    this.cart.append(quantity);
  }

  getCartElement(): HTMLDivElement {
    return this.cart;
  }
  
  render(quantity: number): void{
    (this.cart.querySelector('.cart__quantity') as HTMLSpanElement).innerHTML = quantity.toString();
  }

}

export default CartView;