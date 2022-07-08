import { EventHandler, IProduct } from "../types/types";
import ProductsCollectionView from './ProductsCollectionView';
import CartView from './CartView';
import ModalView from './ModalView';

class AppView {
  private handleUserActions: EventHandler;
  private collectionView: ProductsCollectionView;
  private cartView: CartView;
  private modalView: ModalView;

  constructor(handler: EventHandler) {
    this.handleUserActions = handler;
    this.collectionView = new ProductsCollectionView(handler);
    this.cartView = new CartView(handler);
    this.modalView = new ModalView(handler);
  }

  renderCollection(data: IProduct[]): void {
    this.collectionView.render(data);
  }

  renderCart(quantity: number): void {
    this.cartView.render(quantity);
  }

  showModal(message: string):void {
    this.modalView.render(message);
  }

  closeModal():void {
    this.modalView.clear();
  }
}

export default AppView;