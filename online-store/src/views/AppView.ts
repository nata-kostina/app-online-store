import { EventHandler, IProduct } from "../types/types";
import CollectionView from './CollectionView';
import CartView from './CartView';
import SortView from './SortView';
import FilterView from './FilterView';
import Search from './Search';
import Header from './Header';

class AppView {
  private handleUserActions: EventHandler;
  private collectionView: CollectionView;
  private headerView: Header;
  private cartView: CartView;
  private sortView: SortView;
  private filterView: FilterView;
  private search: Search;
  private wrapper: HTMLElement;

  constructor(handler: EventHandler) {
    this.handleUserActions = handler;

    this.wrapper = document.createElement('wrapper');
    this.wrapper.classList.add('wrapper');

    (document.querySelector('body') as HTMLBodyElement).insertAdjacentElement('afterbegin', this.wrapper);

    this.headerView = new Header();
    this.collectionView = new CollectionView(handler);
    this.cartView = new CartView();
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
*   CART
=================================*/
    const cartContainer = header.querySelector('.cart-container') as HTMLDivElement;
    const cartElement = this.cartView.getCartElement();
    cartContainer.append(cartElement);
/*===============================
*   COLLECTION
=================================*/
    const collectionElement = this.collectionView.getCollectionElement();
    
    mainInner.append(collectionElement, sortElement, filterElement, searchElement);
    
    this.wrapper.append(header, main);
  }

  renderCollection(data: IProduct[]): void {
    this.collectionView.clear();
    this.collectionView.render(data);
  }

  renderCart(quantity: number): void {
    this.cartView.render(quantity);
  }

  resetFilters(): void {
    this.filterView.reset();
  }

}

export default AppView;