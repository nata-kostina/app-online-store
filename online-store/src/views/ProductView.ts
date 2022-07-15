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

    const thumb = document.createElement('div');
    thumb.classList.add('item__thumb');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    const img = document.createElement('img');
    img.classList.add('item__img');
    img.src = data.imgUrl;

    imgContainer.append(img);

    const buttons = document.createElement('div');
    buttons.classList.add('item__buttons');


    const content = document.createElement('div');
    content.classList.add('item__content');

    const title = document.createElement('h3');
    title.classList.add('item__title');
    title.innerHTML = data.title;

    const price = document.createElement('span');
    price.classList.add('item__price');
    price.innerHTML = `€${data.price}`;

    const year = document.createElement('span');
    year.classList.add('item__year');
    year.innerHTML = data.year;

    const quantity = document.createElement('span');
    quantity.classList.add('item__quantity');
    quantity.innerHTML = `Quantity: ${data.quantity}`;

    const variants = document.createElement('div');
    variants.classList.add('item__variants');

    const color = document.createElement('span');
    color.classList.add('item__color', 'color-icon');

    switch (data.color.toLowerCase()) {
      case 'black':
        color.dataset['code'] = '#000000'
        break;
      case 'white':
        color.dataset['code'] = '#ffffff'
        break;
      case 'red':
        color.dataset['code'] = '#DC282E'
        break;
      case 'orange':
        color.dataset['code'] = '#F66D50';
        break;
      case 'green':
        color.dataset['code'] = '#67DD7E';
        break;
      case 'blue':
        color.dataset['code'] = '#4DBEF8';
        break;
      case 'yellow':
        color.dataset['code'] = '#F1ED0D';
        break;
      case 'pink':
        color.dataset['code'] = '#E26AA5';
        break;
      default:
        color.dataset['code'] = '#ffffff'
        break;
    }
    color.style.background = color.dataset['code'] as string;


    const sizes = document.createElement('span');
    sizes.classList.add('item__sizes');
    sizes.innerHTML = data.sizes.toString();

    variants.append(color, sizes);

    const btnToggleInCart = document.createElement('button');
    btnToggleInCart.classList.add('btn', 'btn-cart');
    btnToggleInCart.innerHTML = "<i class='fa-light fa-cart-shopping'></i>";
    btnToggleInCart.addEventListener('click', (event) => this.handler(event, Actions.TOGGLE_PRODUCT_IN_CART))

    const btnToggleInFavs = document.createElement('button');
    btnToggleInFavs.classList.add('btn', 'btn-wishlist');
    btnToggleInFavs.innerHTML = "<i class='fa-light fa-heart'></i>";
    btnToggleInFavs.addEventListener('click', (event) => this.handler(event, Actions.TOGGLE_PRODUCT_IN_FAVS))


    if (data.isBestseller) {
      const bestsellerIcon = document.createElement('span');
      bestsellerIcon.classList.add('bestseller-icon');
      bestsellerIcon.innerHTML = '<i class="fa-regular fa-fire"></i>';
      thumb.append(bestsellerIcon);
    }

    buttons.append(btnToggleInCart, btnToggleInFavs);
    thumb.append(imgContainer, buttons);
    content.append(title, price, variants, year, quantity);
    inner.append(thumb, content);
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
      (this.item.querySelector('.btn-wishlist') as HTMLSpanElement).classList.add('active');
    }
    else
      (this.item.querySelector('.btn-wishlist') as HTMLSpanElement).classList.remove('active');
  }

  highlightProductsInCart(cart: ICartProduct[]): void {
    //debugger
    if (cart.find(product => product.id === this.item.dataset["id"])) {
      (this.item.querySelector('.btn-cart') as HTMLSpanElement).classList.add('active');
    }
    else
      (this.item.querySelector('.btn-cart') as HTMLSpanElement).classList.remove('active');
  }

}

export default ProductView;