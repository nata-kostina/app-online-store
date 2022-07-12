class FavouriteView {
  private fav: HTMLDivElement;
  
  constructor() {
    this.fav = document.createElement('div');
    this.fav.classList.add('favourite');
    this.fav.innerHTML = 'Favorite: ';
    
    const quantity = document.createElement('span');
    quantity.classList.add('favourite__quantity');
    this.fav.append(quantity);
  }

  getFavElement(): HTMLDivElement {
    return this.fav;
  }
  
  render(quantity: number): void{
    (this.fav.querySelector('.favourite__quantity') as HTMLSpanElement).innerHTML = quantity.toString();
  }

}

export default FavouriteView;