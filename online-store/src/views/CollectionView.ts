import { EventHandler, IProduct } from "../types/types";
import ProductView from './ProductView';

class CollectionView {
  private collection: HTMLDivElement;
  private handler: EventHandler;

  constructor(handler: EventHandler) {
    this.handler = handler;
    this.collection = document.createElement('div');
    this.collection.classList.add('collection');
  }

  getCollectionElement(): HTMLDivElement {
    return this.collection;
  }

  render(data: IProduct[]): void {
    data.forEach(p => {
      const product = (new ProductView(this.handler, p).getProductElement());
      this.collection.append(product);
    })
  }

  clear(): void {
    console.log(this.collection);
    this.collection.innerHTML = "";
  }

}

export default CollectionView;