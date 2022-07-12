import { EventHandler, IProduct } from "../types/types";
import ProductsCollectionView from './ProductsCollectionView';
import CartView from './CartView';
import SortView from './SortView';
import FilterView from './FilterView';
import Search from './Search';

class AppView {
  private handleUserActions: EventHandler;
  private collectionView: ProductsCollectionView;
  private cartView: CartView;
  private sortView: SortView;
  private filterView: FilterView;
  private search: Search;
  private main: HTMLElement;

  constructor(handler: EventHandler) {
    this.handleUserActions = handler;

    this.main = document.createElement('main');
    this.main.classList.add('main');
    (document.querySelector('body') as HTMLBodyElement).append(this.main);

    this.collectionView = new ProductsCollectionView(handler);
    this.cartView = new CartView();
    this.sortView = new SortView(handler);
    this.filterView = new FilterView(handler);
    this.search = new Search(handler);
  }

  render(): void {
    const container = document.createElement('div');
    container.classList.add('container');
    this.main.append(container);

    const inner = document.createElement('div');
    inner.classList.add('main__inner');
    container.append(inner);

    this.filterView.applyFilters();
    const filterElement = this.filterView.getFilterElement();

    this.sortView.applySort();
    const sortElement = this.sortView.getSortElement();

    const searchElement = this.search.getSearchElement();

    const cartElement = this.cartView.getCartElement();

    const collectionElement = this.collectionView.getCollectionElement();

    this.main.append(cartElement, collectionElement, sortElement, filterElement, searchElement);
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