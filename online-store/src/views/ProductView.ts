import { Actions, EventHandler, IFavouriteProduct, IProduct } from "../types/types";
import { ICartProduct } from './../types/types';

class ProductView {
  private handler: EventHandler;
  private item: HTMLDivElement;

  constructor(handler: EventHandler, data: IProduct) {
    this.handler = handler;

    this.item = document.createElement('div');
    this.item.classList.add('item');
    this.item.dataset.id = data.id;

    const inner = document.createElement('div');
    inner.classList.add('item__inner');

    const id = document.createElement('h2');
    id.classList.add('item__id');
    id.innerHTML = data.id;

    const title = document.createElement('h3');
    title.classList.add('item__title');
    title.innerHTML = data.title;

    const img = document.createElement('img');
    img.classList.add('item__img');
    img.src = data.imgUrl;

    const content = document.createElement('div');
    content.classList.add('item__content');

    const price = document.createElement('span');
    price.classList.add('item__price');
    price.innerHTML = data.price;

    const year = document.createElement('span');
    year.classList.add('item__year');
    year.innerHTML = data.year;

    const color = document.createElement('span');
    color.classList.add('item__color');
    color.innerHTML = data.color;


    const sizes = document.createElement('span');
    sizes.classList.add('item__sizes');
    sizes.innerHTML = data.sizes.toString();

    const btnToggleInCart = document.createElement('button');
    btnToggleInCart.classList.add('btn', 'btn-cart');
    btnToggleInCart.innerHTML = "Cart picture";
    btnToggleInCart.addEventListener('click', (event) => this.handler(event, Actions.TOGGLE_PRODUCT_IN_CART))

    const btnToggleInFavs = document.createElement('button');
    btnToggleInFavs.classList.add('btn', 'btn-favs');
    btnToggleInFavs.innerHTML = "Heart picture";
    btnToggleInFavs.addEventListener('click', (event) => this.handler(event, Actions.TOGGLE_PRODUCT_IN_FAVS))

    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.innerHTML = '';
    
    const cart = document.createElement('span');
    cart.classList.add('cart');
    cart.innerHTML = '';

    content.append(id, title, price, year, color, sizes, btnToggleInCart, btnToggleInFavs);
    inner.append(img, content, heart, cart);
    this.item.append(inner);
  }

  getProductElement(): HTMLDivElement {
    return this.item;
  }

  productApplyUserSetting(settings: { inCart: boolean, inFavourites: boolean }): void {
    if (settings.inCart) {
      // const span = document.createElement('span');
      // span.innerHTML = 'In Cart';
      // this.item.append(span);
    }
  }

  highlightFavourites(favourites: IFavouriteProduct[]): void {
    if (favourites.find(fav => fav.id === this.item.dataset["id"])) {
      (this.item.querySelector('.heart') as HTMLSpanElement).innerHTML = 'In Favourites';
    }
    else
      (this.item.querySelector('.heart') as HTMLSpanElement).innerHTML = '';
  }

  highlightProductsInCart(cart: ICartProduct[]): void {
    if (cart.find(product => product.id === this.item.dataset["id"])) {
      (this.item.querySelector('.cart') as HTMLSpanElement).innerHTML = 'In Cart';
    }
    else
      (this.item.querySelector('.cart') as HTMLSpanElement).innerHTML = '';
  }

}

export default ProductView;