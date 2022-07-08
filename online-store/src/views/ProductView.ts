import { Product } from "../types/types";

class ProductView {

  static render(data: Product) {
    const item = document.createElement('div');
    item.classList.add('item');

    const inner = document.createElement('div');
    inner.classList.add('item__inner');

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

    content.insertAdjacentElement('beforeend', title);
    content.insertAdjacentElement('beforeend', price);
    content.insertAdjacentElement('beforeend', year);
    content.insertAdjacentElement('beforeend', color);
    content.insertAdjacentElement('beforeend', sizes);
    content.insertAdjacentElement('beforeend', btnToggleInCart);

    inner.insertAdjacentElement('beforeend', img);
    inner.insertAdjacentElement('beforeend', content);
    
    item.insertAdjacentElement('beforeend', inner);

    const collection = document.querySelector('.collection') as HTMLDivElement;
    collection.insertAdjacentElement('beforeend', item);
  }

}

export default ProductView;