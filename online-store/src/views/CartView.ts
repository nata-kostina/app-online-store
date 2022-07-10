class CartView {
  private quantity: HTMLSpanElement;
  constructor() {
       this.quantity = document.querySelector('.cart__quantity') as HTMLSpanElement;
  }
  
  render(quantity: number): void{
    this.quantity.innerHTML = quantity.toString();
  }

}

export default CartView;