import { Actions, Handler, LocalStorageKeys } from '../types/types';
import { IFavouriteProduct } from './../types/types';
import LocalStorage from './../controllers/LocalStorage';

class FavouriteProducts {
  private onModelUpdated: Handler;
  private favs: IFavouriteProduct[];
  constructor(handler: Handler) {
    this.favs = [];
    this.onModelUpdated = handler;
  }

  toggleProduct(productId: string): void {
    const product = this.favs.find(product => product.id === productId);

    if (product) {
      this.deleteFromFavs(product);
    }
    else{
      this.addToFavs({ id: productId })
    }
    //const favourites = LocalStorage.getItem(LocalStorageKeys.FAVOURITES) as IFavouriteProduct[];
    //LocalStorage.setItem<IFavouriteProduct[]>(LocalStorageKeys.FAVOURITES, [...this.favs]);
  }

  private deleteFromFavs(product: IFavouriteProduct): void {
    this.favs = this.favs.filter(p => p.id != product.id);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_FAVS);
  }

  private addToFavs(product: IFavouriteProduct): void {
    this.favs.push(product);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_FAVS);
  }

  getQuantity(): number {
    return this.favs.length;
  }
  setFavourites(ids: IFavouriteProduct[]) {
    this.favs = [...ids];
  }
  getFavouriteProducts(): IFavouriteProduct[] {
    return this.favs;
  }
  reset(): void {
    this.favs = [];
  }

}

export default FavouriteProducts;