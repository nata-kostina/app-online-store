import { Actions, EventHandler, IProduct } from "../types/types";

class ProductView {
  private handleToggleInCartClick: EventHandler;
  private item: HTMLDivElement;
  constructor(handler: EventHandler, data: IProduct) {
    this.handleToggleInCartClick = handler;

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

    btnToggleInCart.addEventListener('click', (event) => this.handleToggleInCartClick(event, Actions.TOGGLE_PRODUCT_IN_CART))

    content.insertAdjacentElement('beforeend', id);
    content.insertAdjacentElement('beforeend', title);
    content.insertAdjacentElement('beforeend', price);
    content.insertAdjacentElement('beforeend', year);
    content.insertAdjacentElement('beforeend', color);
    content.insertAdjacentElement('beforeend', sizes);
    content.insertAdjacentElement('beforeend', btnToggleInCart);

    inner.insertAdjacentElement('beforeend', img);
    inner.insertAdjacentElement('beforeend', content);

    this.item.insertAdjacentElement('beforeend', inner);
  }

  getProductElement(): HTMLDivElement {
    return this.item;
  }

}

export default ProductView;