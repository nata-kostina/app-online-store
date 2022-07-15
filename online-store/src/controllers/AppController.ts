import { Actions, FilterName, FilterGroups, IFavouriteProduct, ICartProduct, LocalStorageKeys, Messages, SortOptions, Mode } from '../types/types';
import AppView from '../views/AppView';
import AppModel from '../models/AppModel';
import Filter from '../models/Filter';
import Sort from '../models/Sort';
import Modal from '../models/Modal';
import LocalStorage from './LocalStorage';
import Search from '../models/Search';

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
    this.processLocalStorage();
    this.view.render();

    const data = await this.model.getProducts(this.dataURL);
    this.model.setCurrentCollection(data);

    if (!Filter.isEmpty()) {
      this.model.filterProducts();
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

  private handleUserActions(e: Event, action: Actions): void {
    switch (action) {
      case Actions.TOGGLE_PRODUCT_IN_CART:
        this.toggleProductInCart(e);
        break;
        
      case Actions.TOGGLE_PRODUCT_IN_WISHLIST:
        this.toggleProductInWishlist(e);
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
      case Actions.TOGGLE_PRODUCT_IN_WISHLIST:
        this.view.renderFavouriteProductsIcon(this.model.getQuantityInFavourite());
        this.view.highlightFavourites(this.model.getFavouriteProducts());
        break;
      case Actions.SHOW_MODAL:
        this.showModal(options as Messages);
        break;
      case Actions.UPDATE_COLLECTION:
        this.updateCollection();
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

  private toggleProductInWishlist(e: Event): void {
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
    const mode = target.checked ? Mode.ON : Mode.OFF;
    Filter.toggleFilter({ name, value, mode });

    if (!Filter.isEmpty())
      LocalStorage.setItem<FilterGroups>('filter', Filter.getFilters());
  }

  private updateRange(e: Event | CustomEvent): void {
    const details = (e as CustomEvent).detail;
    if (details.name === FilterName.PRICE) {
      details.values = details.values.map((v: string) => (v.match(/^€(.+)/m) as string[])[1]);
    }
    Filter.setRangeFilter(details);
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
        values.forEach(value => Filter.toggleFilter({ name: filterName, value, mode: Mode.ON }));
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
   // this.view.removeSliderEvents();
   new Event('mouseout', {"bubbles":true, "cancelable":false, "composed" : true});
    Modal.getInstance().showModal(message);
  }
}

export default AppController;