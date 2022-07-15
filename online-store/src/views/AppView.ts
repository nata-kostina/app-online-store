import { EventHandler, IFavouriteProduct, IProduct } from "../types/types";
import CollectionView from './CollectionView';
import CartView from './CartView';
import SortView from './SortView';
import FilterView from './FilterView';
import Search from './Search';
import Header from './Header';
import ResetBtn from './ResetBtn';
import FavouriteView from './Favourite';
import { ProductToDisplay, ICartProduct } from './../types/types';
import FavouriteProducts from './../models/FavouriteProducts';
import Intro from './Intro';
import Footer from './Footer';

class AppView {
  private handleUserActions: EventHandler;
  private collectionView: CollectionView;
  private headerView: Header;
  private cartView: CartView;
  private sortView: SortView;
  private filterView: FilterView;
  private search: Search;
  private wrapper: HTMLElement;
  private resetBtn: ResetBtn;
  private favouriteView: FavouriteView;
  private intro: Intro;
  private footer: Footer;

  constructor(handler: EventHandler) {
    this.handleUserActions = handler;

    this.wrapper = document.createElement('wrapper');
    this.wrapper.classList.add('wrapper');

    (document.querySelector('body') as HTMLBodyElement).insertAdjacentElement('afterbegin', this.wrapper);

    this.headerView = new Header();
    this.resetBtn = new ResetBtn(handler);
    this.collectionView = new CollectionView(handler);
    this.cartView = new CartView();
    this.favouriteView = new FavouriteView();
    this.sortView = new SortView(handler);
    this.filterView = new FilterView(handler);
    this.search = new Search(handler);
    this.intro = new Intro();
    this.footer = new Footer();
  }

  render(): void {
    /*===============================
    *   HEADER
    =================================*/
    const header = this.headerView.getHeaderElement();
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
    *   INTRO
    =================================*/
    const intro = this.intro.getElement();   
    /*===============================
    *   MAIN LAYOUT
    =================================*/
    const layout = document.createElement('div');
    layout.classList.add('layout-cols-2');
    mainInner.append(layout);

    const col_s = document.createElement('div');
    col_s.classList.add('col', 'col-s');
    layout.append(col_s);

    const col_l = document.createElement('div');
    col_l.classList.add('col', 'col-l');
    layout.append(col_l);

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
    *   SETTING BAR
    =================================*/
    const bar = document.createElement('div');
    bar.classList.add('settings-bar');
    const barInner = document.createElement('div');
    barInner.classList.add('settings-bar__inner');
    bar.append(barInner);
    /*===============================
    *   SETTINGS
    =================================*/
    const resetBtn = this.resetBtn.getSettingsElement();
    barInner.append(searchElement, sortElement, resetBtn);
    /*===============================
    *   COLLECTION
    =================================*/
    const collectionElement = this.collectionView.getCollectionElement();
        /*===============================
    *   FOOTER
    =================================*/
    const footer = this.footer.getElement();
    col_s.append(filterElement);
    col_l.append(bar, collectionElement);

    this.wrapper.append(header,intro, main, footer);
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
  resetCollection(): void {
    this.collectionView.clear();
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

  clearSearch(): void {
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