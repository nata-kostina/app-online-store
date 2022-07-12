import { Actions, Handler } from '../types/types';
import { IFavouriteProduct } from './../types/types';

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
    else
      this.addToFavs({ id: productId });   
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

}

export default FavouriteProducts;