import { EventHandler, IFavouriteProduct, IProduct } from "../types/types";
import ProductView from './ProductView';
import { ICartProduct } from '../types/types';

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
  fill(data: IProduct[]): void {
    data.forEach(p => {
      const product = new ProductView(this.handler, p);
      this.items.push(product);
    })
  }

  render(): void {
    this.items.forEach(product => {
      const productEl = product.getProductElement();
      this.collection.append(productEl);
    })
  }
  reset(): void {
    this.items = [];
  }
  clear(): void {
    this.collection.innerHTML = "";
  }

  highlightFavourites(favourites: IFavouriteProduct[]): void {
    this.items.forEach(i => {
      i.highlightFavourites(favourites);
    });
  }


  highlightProductsInCart(favourites: ICartProduct[]): void {
    this.items.forEach(i => {
      i.highlightProductsInCart(favourites);
    });
  }

  // applyUserSettings(favourites: IFavouriteProduct[], cart: ICartProduct[]): void {
  //   //this.collectionView.applyUserSettings(favourites, cart);
  //   this.items.forEach(i => {
  //     i.applyFavourites(favourites);
  //   });
  // }

}

export default CollectionView;