import { EventHandler, IProduct } from "../types/types";
import ProductsCollectionView from './ProductsCollectionView';
import CartView from './CartView';

class AppView {
  private handleUserActions: EventHandler;
  private collectionView: ProductsCollectionView;
  private cartView: CartView;

  constructor(handler: EventHandler) {
    this.handleUserActions = handler;
    this.collectionView = new ProductsCollectionView(handler);
    this.cartView = new CartView(handler);
  }

  renderCollection(data: IProduct[]): void {
    this.collectionView.render(data);
  }

  renderCart(quantity: number): void {
    this.cartView.render(quantity);
  }
}

export default AppView;