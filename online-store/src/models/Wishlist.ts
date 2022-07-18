import { Actions, Handler } from '../types/types';
import { IFavouriteProduct } from '../types/types';

class FavouriteProducts {
  private onModelUpdated: Handler;
  private wishlist: IFavouriteProduct[];
  constructor(handler: Handler) {
    this.wishlist = [];
    this.onModelUpdated = handler;
  }

  toggleProduct(productId: string): void {
    const product = this.wishlist.find(product => product.id === productId);
    if (product) {
      this.deleteFromFavs(product);
    }
    else{
      this.addToFavs({ id: productId })
    }
  }

  private deleteFromFavs(product: IFavouriteProduct): void {
    this.wishlist = this.wishlist.filter(p => p.id != product.id);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_WISHLIST);
  }

  private addToFavs(product: IFavouriteProduct): void {
    this.wishlist.push(product);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_WISHLIST);
  }

  getQuantity(): number {
    return this.wishlist.length;
  }
  
  setFavourites(ids: IFavouriteProduct[]) {
    this.wishlist = [...ids];
  }

  getFavouriteProducts(): IFavouriteProduct[] {
    return this.wishlist;
  }

  reset(): void {
    this.wishlist = [];
  }

}

export default FavouriteProducts;