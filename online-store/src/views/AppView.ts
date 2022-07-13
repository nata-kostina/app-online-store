import { EventHandler, IFavouriteProduct, IProduct } from "../types/types";
import CollectionView from './CollectionView';
import CartView from './CartView';
import SortView from './SortView';
import FilterView from './FilterView';
import Search from './Search';
import Header from './Header';
import Settings from './Settings';
import FavouriteView from './Favourite';
import { ProductToDisplay, ICartProduct } from './../types/types';
import FavouriteProducts from './../models/FavouriteProducts';

class AppView {
  private handleUserActions: EventHandler;
  private collectionView: CollectionView;
  private headerView: Header;
  private cartView: CartView;
  private sortView: SortView;
  private filterView: FilterView;
  private search: Search;
  private wrapper: HTMLElement;
  private settings: Settings;
  private favouriteView: FavouriteView;

  constructor(handler: EventHandler) {
    this.handleUserActions = handler;

    this.wrapper = document.createElement('wrapper');
    this.wrapper.classList.add('wrapper');

    (document.querySelector('body') as HTMLBodyElement).insertAdjacentElement('afterbegin', this.wrapper);

    this.headerView = new Header();
    this.settings = new Settings(handler);
    this.collectionView = new CollectionView(handler);
    this.cartView = new CartView();
    this.favouriteView = new FavouriteView();
    this.sortView = new SortView(handler);
    this.filterView = new FilterView(handler);
    this.search = new Search(handler);
  }

  render(): void {
    /*===============================
    *   HEADER
    =================================*/
    const header = this.headerView.getHeaderElement();
    /*===============================
    *   MAIN
    =================================*/
    const main = document.createElement('main');
    main.classList.add('main');

    const container = document.createElement('div');
    container.classList.add('container');
    main.append(container);

    const mainInner = document.createElement('div');
    mainInner.classList.add('main__inner');
    container.append(mainInner);
    /*===============================
    *   FILTER
    =================================*/
    this.filterView.applyFilters();
    const filterElement = this.filterView.getFilterElement();
    /*===============================
    *   SORT
    =================================*/
    this.sortView.applySort();
    const sortElement = this.sortView.getSortElement();
    /*===============================
    *   SEARCH
    =================================*/
    const searchElement = this.search.getSearchElement();
    /*===============================
    *   SETTINGS
    =================================*/
    const settings = this.settings.getSettingsElement();
    /*===============================
    *   CART ICON
    =================================*/
    const cartContainer = header.querySelector('.cart-container') as HTMLLinkElement;
    const cartElement = this.cartView.getCartElement();
    cartContainer.append(cartElement);
    /*===============================
    *   FAVOURITE PRODUCTS ICON
    =================================*/
    const favContainer = header.querySelector('.wishlist-container') as HTMLLinkElement;
    const favElement = this.favouriteView.getFavElement();
    favContainer.append(favElement);
    /*===============================
    *   COLLECTION
    =================================*/
    const collectionElement = this.collectionView.getCollectionElement();

    mainInner.append(collectionElement,sortElement, filterElement, searchElement, settings);

    this.wrapper.append(header, main);
  }

  fillCollection(data: IProduct[]): void {
    this.collectionView.reset();
    this.collectionView.fill(data);
  }
  renderCollection(): void {
    this.collectionView.clear();
    this.collectionView.render();
  }

  renderCart(quantity: number): void {
    this.cartView.render(quantity);
  }

  renderFavouriteProductsIcon(quantity: number): void {
    this.favouriteView.render(quantity);
  }

  resetFilters(): void {
    this.filterView.reset();
  }

  resetSort(): void {
    this.sortView.reset();
  }
  resetFavouritesIcon(): void {
    this.favouriteView.reset();
  }
  resetCartIcon(): void {
    this.cartView.reset();
  }

  clearSearch():void {
    this.search.reset();
  }

  highlightFavourites(favourites: IFavouriteProduct[]): void {
    this.collectionView.highlightFavourites(favourites);
  }

  highlightProductsInCart(cart: ICartProduct[]): void {
    this.collectionView.highlightProductsInCart(cart);
  }

}

export default AppView;