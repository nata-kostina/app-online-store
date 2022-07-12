import { EventHandler, IFavouriteProduct, IProduct } from "../types/types";
import ProductView from './ProductView';

class CollectionView {
  private collection: HTMLDivElement;
  private handler: EventHandler;
  private items: ProductView[];

  constructor(handler: EventHandler) {
    this.handler = handler;
    this.collection = document.createElement('div');
    this.collection.classList.add('collection');
    this.items = [];
  }

  getCollectionElement(): HTMLDivElement {
    return this.collection;
  }

  render(data: IProduct[]): void {
    data.forEach(p => {
      const product = new ProductView(this.handler, p);
      this.items.push(product);
      const productEl = product.getProductElement();
      //product.productApplyUserSetting({ inCart: true, inFavourites: true });
      this.collection.append(productEl);
    })
  }

  clear(): void {
    console.log(this.collection);
    this.collection.innerHTML = "";
  }

  applyFavourites(favourites: IFavouriteProduct[]): void {
    this.items.forEach(i => {
      i.applyFavourites(favourites);
    });
  }

}

export default CollectionView;