import { Actions, FilterItem, SortOption, SortOptions } from '../types/types';
import AppView from '../views/AppView';
import AppModel from './../models/AppModel';
import Filter from './Filter';
import Sort from './Sort';

class AppController {
  view: AppView;
  model: AppModel;
  dataURL: string;
  storeURL: string;
  filter: Filter;

  constructor() {
    this.view = new AppView(this.handleUserActions.bind(this));
    this.model = new AppModel(this.onModelUpdated.bind(this));

    this.dataURL = "./data/data.json";
    this.storeURL = "./data/store.json";

    this.filter = new Filter();
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
      case Actions.SORT:
      case Actions.FILTER:
        //debugger
        this.filterAndSortProducts(e, action);
        break;
    }
  }

  onModelUpdated(action: Actions, options?: string): void {
    switch (action) {
      case Actions.INIT:
        this.view.renderCollection(this.model.getDefaultCollection());
        break;
      case Actions.TOGGLE_PRODUCT_IN_CART:
        this.view.renderCart(this.model.getQuantityInCart());
        break;
      case Actions.SHOW_MODAL:
        this.view.showModal(options as string);
        break;
      case Actions.UPDATE_COLLECTION:
        this.view.renderCollection(this.model.getCurrentCollection());
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

  filterAndSortProducts(e: Event, action: Actions): void {
    if (action === Actions.FILTER){
      this.setFilters(e);
    }
    else if (action === Actions.SORT){
      this.setSort(e);
    }
    this.model.filterAndSortProducts();
  }

  setSort(e: Event): void {
    const target = e.target as HTMLOptionElement;
    const value = target.value;
    const [option, order] = value.split('-');   
    Sort.setSort(option, order); 
  }

  setFilters(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;
    const mode = target.checked ? 'on' : 'off';
    Filter.toggleFilter({ name, value, mode });
  }
}

export default AppController;