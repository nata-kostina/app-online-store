/* eslint-disable no-case-declarations */
import { Actions, FilterGroups, IFavouriteProduct, ICartProduct, LocalStorageKeys, Messages, SortOptions } from '../types/types';
import AppView from '../views/AppView';
import AppModel from './../models/AppModel';
import Filter from '../models/Filter';
import Sort from '../models/Sort';
import Modal from './../models/Modal';
import LocalStorage from './LocalStorage';
import Search from './../models/Search';

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
    this.processLocalStorage(); // prepare models, set Filters, sort, favs and products in cart 
    this.view.render(); // render basic layout, everything except collection, quantity in cart and q

    const data = await this.model.getProducts(this.dataURL); // get source data
    this.model.setCurrentCollection(data); // set them to current collection

    if (!Filter.isEmpty()) {
      this.model.filterProducts(); // filter and sort products according to filters and sort if they exist
    }

    if (!Sort.isEmpty()) {
      this.model.sortProducts();
    }


    this.updateCollection();
  }

  private updateCollection(): void {
    const collection = this.model.getCurrentCollection();

    if (collection.length === 0) {
      this.view.resetCollection();
      this.showModal(Messages.EMPTY_COLLECTION);
    } else {
      this.view.fillCollection(collection);

      if (this.model.getFavouriteProducts().length > 0) {
        this.view.renderFavouriteProductsIcon(this.model.getFavouriteProducts().length);
        this.view.highlightFavourites(this.model.getFavouriteProducts());
      }

      if (this.model.getProductsInCart().length > 0) {
        this.view.renderCart(this.model.getProductsInCart().length);
        this.view.highlightProductsInCart(this.model.getProductsInCart());
      }
      this.view.renderCollection();
    }

  }

  private handleUserActions(e: Event, action: Actions) {
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
        LocalStorage.removeItem(LocalStorageKeys.FILTER);
        this.model.resetFilters();
        break;
      case Actions.SEARCH:
        this.search(e);
        break;
      case Actions.RESET_SETTINGS:
        this.resetSettings();
        break;
      case Actions.CLEAR_SEARCH:
        this.clearSearch();
        break;
      default:
        break;
    }
  }

  private onModelUpdated(action: Actions, options?: string): void {
    switch (action) {
      case Actions.TOGGLE_PRODUCT_IN_CART:
        this.view.renderCart(this.model.getQuantityInCart());
        this.view.highlightProductsInCart(this.model.getProductsInCart());
        break;
      case Actions.TOGGLE_PRODUCT_IN_FAVS:
        this.view.renderFavouriteProductsIcon(this.model.getQuantityInFavourite());
        this.view.highlightFavourites(this.model.getFavouriteProducts());
        break;
      case Actions.SHOW_MODAL:
        this.showModal(options as Messages);
        break;
      case Actions.UPDATE_COLLECTION:
        //debugger;
        this.updateCollection();
        // if (this.isCollectionEmpty(collection)) {
        //   this.showModal(Messages.EMPTY_COLLECTION);
        //   this.view.renderCollection(collection);
        // }
        // else {
        //   this.view.renderCollection(collection);
        //   if (this.model.getFavouriteProducts().length > 0) {
        //     this.view.applyFavourites(this.model.getFavouriteProducts());
        //   }
        // }
        break;
      case Actions.RESET_FILTERS:
        this.view.resetFilters();
        break;
      case Actions.RESET_SETTINGS:
        this.view.resetFilters();
        this.view.resetSort();
        this.view.resetFavouritesIcon();
        this.view.resetCartIcon();
        break;
      default:
        break;
    }
  }

  private toggleProductInCart(e: Event): void {
    const target = e.target as HTMLButtonElement;
    const product = target.closest('.item') as HTMLDivElement;
    const productId = product.dataset.id as string;
    this.model.toggleProductInCart(productId);
    const cart = this.model.getProductsInCart();
    LocalStorage.setItem<IFavouriteProduct[]>(LocalStorageKeys.CART, [...cart]);
  }

  private toggleProductInFavourites(e: Event): void {
    const target = e.target as HTMLButtonElement;
    const product = target.closest('.item') as HTMLDivElement;
    const productId = product.dataset.id as string;
    this.model.toggleProductInFavourites(productId);
    const favourites = this.model.getFavouriteProducts();
    LocalStorage.setItem<IFavouriteProduct[]>(LocalStorageKeys.FAVOURITES, [...favourites]);
  }

  private filterAndSortProducts(e: Event | CustomEvent, action: Actions): void {
    if (action === Actions.FILTER) {
      this.setFilters(e);
    }
    else if (action === Actions.SORT) {
      this.setSort(e);
    }
    else if (action === Actions.UPDATE_RANGE) {
      this.updateRange(e);
    }
    this.model.updateCollection();
  }

  private setSort(e: Event): void {
    const target = e.target as HTMLOptionElement;
    const value = target.value;
    const [option, order] = value.split('-');
    Sort.setSort(option, order);
    LocalStorage.setItem<SortOptions>('sort', Sort.getSort());
  }

  private setFilters(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;
    const mode = target.checked ? 'on' : 'off';
    Filter.toggleFilter({ name, value, mode });

    if (!Filter.isEmpty())
      LocalStorage.setItem<FilterGroups>('filter', Filter.getFilters());
  }

  private updateRange(e: Event | CustomEvent): void {
    const { name, values, handle } = (e as CustomEvent).detail;
    Filter.setRangeFilter({ name, values, handle });
    if (!Filter.isEmpty())
      LocalStorage.setItem<FilterGroups>('filter', Filter.getFilters());
  }

  private search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    Search.setSearch(value);
    this.model.updateCollection();
  }

  private setFiltersFromLocalStorage(): void {
    const filters = LocalStorage.getItem(LocalStorageKeys.FILTER) as FilterGroups;
    const keys = Object.keys(filters);
    if (keys) {
      keys.forEach(filterName => {
        const values = filters[filterName];
        values.forEach(value => Filter.toggleFilter({ name: filterName, value, mode: 'on' }));
      })
    }
  }

  private setSortFromLocalStorage(): void {
    const { option, order } = LocalStorage.getItem(LocalStorageKeys.SORT) as SortOptions;
    if (option && order)
      Sort.setSort(option, order);
  }

  private processLocalStorage(): void {
    if (LocalStorage.getLength() != 0) {
      for (let i = 0; i < LocalStorage.getLength(); i++) {
        const key = LocalStorage.getKey(i);
        if (key === LocalStorageKeys.FILTER) {
          this.setFiltersFromLocalStorage()
        }
        else if (key === LocalStorageKeys.SORT) {
          this.setSortFromLocalStorage();
        }
        else if (key === LocalStorageKeys.FAVOURITES) {
          const favourites = LocalStorage.getItem(LocalStorageKeys.FAVOURITES) as IFavouriteProduct[];
          this.model.setFavourites(favourites);
        }
        else if (key === LocalStorageKeys.CART) {
          const cart = LocalStorage.getItem(LocalStorageKeys.CART) as ICartProduct[];
          this.model.setProductsInCart(cart);
        }
      }
    }
  }

  private resetSettings(): void {
    LocalStorage.clear();
    Filter.resetFilters();
    Sort.resetSort();
    Search.resetSearch();
    this.model.resetProductsInCart();
    this.model.resetFavourites();
    this.model.updateCollection();
    this.onModelUpdated(Actions.RESET_SETTINGS);
  }

  private clearSearch() {
    Search.resetSearch();
    this.model.updateCollection();
    this.view.clearSearch();
  }

  private showModal(message: Messages): void {
    Modal.showModal(message);
  }
}

export default AppController;