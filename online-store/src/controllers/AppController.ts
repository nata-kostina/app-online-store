/* eslint-disable no-case-declarations */
import { Actions, FilterGroups, FilterItem, IFavouriteProduct, IProduct, LocalStorageKeys, Messages, SortOption, SortOptions } from '../types/types';
import AppView from '../views/AppView';
import AppModel from './../models/AppModel';
import Filter from '../models/Filter';
import Sort from '../models/Sort';
import Modal from './../models/Modal';
import LocalStorage from './LocalStorage';

class AppController {
  view: AppView;
  model: AppModel;
  dataURL: string;
  storeURL: string;

  constructor() {
    this.model = new AppModel(this.onModelUpdated.bind(this));
    this.view = new AppView(this.handleUserActions.bind(this));
    this.dataURL = "./data/data.json";
    this.storeURL = "./data/store.json";
  }

  async start(): Promise<void> {
    this.processLocalStorage(); // prepare models
    this.view.render();
    const data = await this.model.getProducts(this.dataURL);
    this.model.setCurrentCollection(data);
    this.model.setSortedFilteredCollection(data);
    this.model.filterAndSortProducts();
  }

  handleUserActions(e: Event, action: Actions) {
    switch (action) {
      case Actions.TOGGLE_PRODUCT_IN_CART:
        this.toggleProductInCart(e);
        break;
      case Actions.TOGGLE_PRODUCT_IN_FAVS:
        this.toggleProductInFavourites(e);
        break;
      case Actions.SORT:
      case Actions.FILTER:
      case Actions.UPDATE_RANGE:
        this.filterAndSortProducts(e, action);
        break;
      case Actions.RESET_FILTERS:
        this.model.resetFilters();
        break;
      case Actions.SEARCH:
        this.search(e);
        break;
      case Actions.RESET_SETTINGS:
        this.resetSettings();
        break;
      default:
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
      case Actions.TOGGLE_PRODUCT_IN_FAVS:
        this.view.renderFavouriteProductsIcon(this.model.getQuantityInFavourite());
        this.view.applyFavourites(this.model.getFavouriteProducts());
        break;
      case Actions.SET_FAVOURITES:
       // this.view.applyFavourites(this.model.getFavouriteProducts());
        break;
      case Actions.SHOW_MODAL:
        this.showModal(options as Messages);
        break;
      case Actions.UPDATE_COLLECTION:
        const collection = this.model.getCurrentCollection();
        if (this.isCollectionEmpty(collection)) {
          this.showModal(Messages.EMPTY_COLLECTION);
        }
        this.view.renderCollection(collection);
        if (this.model.getFavouriteProducts().length > 0) {
          this.view.applyFavourites(this.model.getFavouriteProducts());
        }
        break;
      case Actions.RESET_FILTERS:
        this.view.resetFilters();
        break;
      case Actions.RESET_SETTINGS:
        this.view.resetFilters();
        this.view.resetSort();
        this.view.resetFavourites();
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
  toggleProductInFavourites(e: Event): void {
    const target = e.target as HTMLButtonElement;
    const product = target.closest('.item') as HTMLDivElement;
    const productId = product.dataset.id as string;
    this.model.toggleProductInFavourites(productId);
  }
  filterAndSortProducts(e: Event | CustomEvent, action: Actions): void {
    if (action === Actions.FILTER) {
      this.setFilters(e);
    }
    else if (action === Actions.SORT) {
      this.setSort(e);
    }
    else if (action === Actions.UPDATE_RANGE) {
      this.updateRange(e);
    }
    this.model.filterAndSortProducts();
  }

  setSort(e: Event): void {
    const target = e.target as HTMLOptionElement;
    const value = target.value;
    const [option, order] = value.split('-');
    Sort.setSort(option, order);
    LocalStorage.setItem<SortOptions>('sort', Sort.getSort());
  }

  setFilters(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;
    const mode = target.checked ? 'on' : 'off';
    Filter.toggleFilter({ name, value, mode });

    if (!Filter.isEmpty())
      LocalStorage.setItem<FilterGroups>('filter', Filter.getFilters());
  }

  updateRange(e: Event | CustomEvent): void {
    const { name, values, handle } = (e as CustomEvent).detail;
    Filter.setRangeFilter({ name, values, handle });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.model.searchProducts(value);
  }

  isCollectionEmpty(collection: IProduct[]): boolean {
    return collection.length <= 0;
  }

  showModal(message: Messages): void {
    Modal.showModal(message);
  }

  processLocalStorage(): void {
    if (LocalStorage.getLength() === 0) {
      Filter.resetFilters();
      Sort.resetSort();
      this.model.resetFavourites();
      return;
    }
    for (let i = 0; i < LocalStorage.getLength(); i++) {
      const key = LocalStorage.getKey(i);
      if (key === LocalStorageKeys.FILTER) {
        const filters = LocalStorage.getItem(key) as FilterGroups;
        const keys = Object.keys(filters);
        keys.forEach(filterName => {
          const values = filters[filterName];
          values.forEach(value => Filter.toggleFilter({ name: filterName, value, mode: 'on' }));
        })
      }
      else if (key === LocalStorageKeys.SORT) {
        const { option, order } = LocalStorage.getItem(key) as SortOptions;
        if (option && order)
          Sort.setSort(option, order);
      }
      else if (key === LocalStorageKeys.FAVOURITES) {
        const favourites = LocalStorage.getItem(key) as IFavouriteProduct[];
        this.model.setFavourites(favourites);
      }
    }
  }

  resetSettings(): void {
    LocalStorage.clear();
    this.processLocalStorage();
    this.model.filterAndSortProducts();
    this.onModelUpdated(Actions.RESET_SETTINGS);
  }

  getFavouriteProducts(): IFavouriteProduct[] {
    return this.model.getFavouriteProducts();
  }
}

export default AppController;