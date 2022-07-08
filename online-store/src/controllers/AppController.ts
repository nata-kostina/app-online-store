import { Actions } from '../types/types';
import AppView from '../views/AppView';
import AppModel from './../models/AppModel';

class AppController {
  view: AppView;
  model: AppModel;
  dataURL: string;
  storeURL: string;

  constructor() {
    this.view = new AppView(this.handleUserActions.bind(this));
    this.model = new AppModel(this.onModelUpdated.bind(this));

    this.dataURL = "./data/data.json";
    this.storeURL = "./data/store.json";
  }

  start(): void {
    this.model.getProducts(this.dataURL);
  }

  handleUserActions(e: Event, action: Actions) {
    switch (action) {
      case Actions.TOGGLE_PRODUCT_IN_CART:
        this.toggleProductInCart(e);
        break;
      case Actions.CLOSE_MODAL:
        this.view.closeModal();
        break;
    }
  }

  onModelUpdated(action: Actions, options?: string): void {
    switch (action) {
      case Actions.INIT:
        this.view.renderCollection(this.model.getCollection());
        break;
      case Actions.TOGGLE_PRODUCT_IN_CART:
        this.view.renderCart(this.model.getQuantityInCart());
        break;
      case Actions.SHOW_MODAL:
        this.view.showModal(options as string);
        break;
      default:
        break;
    }
  }

  toggleProductInCart(e: Event): void {
    const target = e.target as HTMLButtonElement;
    const product = target.closest('.item') as HTMLDivElement;
    const productId = product.dataset.id as string;
    this.model.toggleProductInCart(productId);
  }
}

export default AppController;