import { Product } from "../types/types";

class ProductView {

  static render(data: Product) {
    const item = document.createElement('div');
    item.classList.add('item');

    const title = document.createElement('h3');
    title.classList.add('item__title');
    title.innerHTML = data.title;

    const description = document.createElement('p');
    description.classList.add('item__description');
    description.innerHTML = data.shortDescription;


    item.insertAdjacentElement('beforeend', title);
    item.insertAdjacentElement('beforeend', description);

    const collection = document.querySelector('.collection') as HTMLDivElement;
    collection.insertAdjacentElement('beforeend', item);
  }

}

export default ProductView;