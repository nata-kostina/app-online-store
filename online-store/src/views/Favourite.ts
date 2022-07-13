class FavouriteView {
  private wishlist: HTMLSpanElement;
  
  constructor() {
    this.wishlist = document.createElement('span');
    this.wishlist.classList.add('quantity-icon','wishlist-quantity');
    this.wishlist.innerHTML = '0 ';
  }

  getFavElement(): HTMLSpanElement {
    return this.wishlist;
  }
  
  render(quantity: number): void{
    this.wishlist.innerHTML = quantity.toString();
  }

  reset(): void {
    this.wishlist.innerHTML = '0';
  }

}

export default FavouriteView;