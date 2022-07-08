import { EventHandler, Product } from "../types/types";
import ProductsCollectionView from './ProductsCollectionView';

class AppView {
  handleUserActions: EventHandler;
  collectionView: ProductsCollectionView;
  //main: HTMLElement;
  //updateBtn: HTMLButtonElement;

  constructor(handler: EventHandler) {
    this.handleUserActions = handler;
    this.collectionView = new ProductsCollectionView(handler);
    //this.main = document.querySelector('main') as HTMLElement;
    //this.updateBtn = this.main.querySelector('.btn-update') as HTMLButtonElement;
    //this.updateBtn.addEventListener('click',  (e) => this.handleUserActions(e, 'test'));
  }

  drawCollection(data: Product[]): void {    
    this.collectionView.render(data);
  }
}

export default AppView;