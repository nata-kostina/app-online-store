import { Actions, Handler } from "../types/types";
import { IProduct } from './../types/types';
import Collection from './Collection';
import Cart from './Cart';
import Modal from './Modal';

class AppModel {
  private onModelUpdated: Handler;
  private collection: Collection;
  private cart: Cart;

  constructor(handler: Handler) {
    this.onModelUpdated = handler;
    this.collection = new Collection();
    this.cart = new Cart(handler);    
  }

  async getProducts(url: string): Promise<IProduct[]> {
    const data = await fetch(url)
      .then(res => res.json())
      .then((data: IProduct[]) => data);
    this.collection.setCollection(data);
    this.onModelUpdated(Actions.INIT);
    return data;
  }

  getCollection(): IProduct[] {
    return this.collection.getCollection() as IProduct[];
  }

  toggleProductInCart(id: string): void {
    this.cart.toggleProduct(id);
  }

  getQuantityInCart(): number {
    return this.cart.getQuantity();
  }
}

export default AppModel;