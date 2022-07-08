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

  handleUserActions(e: Event, type: string) {
    switch (type) {
      case "test":
        this.handleBtnClick();
        break;
      case "TOGGLE-PRODUCT-IN-CART":        
        this.toggleProductInCart(e);
        break;
    }
  }

  handleBtnClick(): void {
    console.log('Test');
  }

  onModelUpdated(type: string): void {
    switch (type) {
      case "init":
        this.view.renderCollection(this.model.getCollection());
        break;
        case "TOGGLE-PRODUCT-IN-CART":
          this.view.renderCart(this.model.getQuantityInCart());
          break;
      default:
        break;
    }
  }

  toggleProductInCart(e: Event): void{
    const target = e.target as HTMLButtonElement;
    const product = target.closest('.item') as HTMLDivElement;
    const productId = product.dataset.id as string;
    this.model.toggleProductInCart(productId);
  }
}

export default AppController;