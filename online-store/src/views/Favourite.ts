class FavouriteView {
  private fav: HTMLDivElement;
  
  constructor() {
    this.fav = document.createElement('div');
    this.fav.classList.add('favourite');
    this.fav.innerHTML = 'Favorite: ';

    const quantity = document.createElement('span');
    quantity.classList.add('favourite__quantity');
    quantity.innerHTML = '0';
    this.fav.append(quantity);
  }

  getFavElement(): HTMLDivElement {
    return this.fav;
  }
  
  render(quantity: number): void{
    (this.fav.querySelector('.favourite__quantity') as HTMLSpanElement).innerHTML = quantity.toString();
  }

  reset(): void {
    (this.fav.querySelector('.favourite__quantity') as HTMLSpanElement).innerHTML = '0';
  }

}

export default FavouriteView;