import { EventHandler, FilterGroups, IProduct, SortOptions } from "../types/types";
import ProductsCollectionView from './ProductsCollectionView';
import CartView from './CartView';
import SortView from './SortView';
import FilterView from './FilterView';
import SliderView from './Slider';
import Search from './Search';

class AppView {
  private handleUserActions: EventHandler;
  private collectionView: ProductsCollectionView;
  // private cartView: CartView;
  private sortView: SortView;
  private filterView: FilterView;
  //private search: Search;
  private main: HTMLElement;

  constructor(handler: EventHandler) {
    this.handleUserActions = handler;

    this.main = document.createElement('main');
    this.main.classList.add('main');


    this.collectionView = new ProductsCollectionView(handler);
    //this.cartView = new CartView();
    this.sortView = new SortView(handler);
    this.filterView = new FilterView(handler);
    //this.search = new Search(handler);

    (document.querySelector('body') as HTMLBodyElement).append(this.main);
  }

  render(): void {
    const container = document.createElement('div');
    container.classList.add('container');
    this.main.append(container);

    const inner = document.createElement('div');
    inner.classList.add('main__inner');
    container.append(inner);

    this.filterView.applyFilters();
    const filter = this.filterView.getFilterElement();

    this.sortView.applySort();
    const sortElement = this.sortView.getSortElement();

    this.main.append(sortElement, filter);
  }

  renderCollection(data: IProduct[]): void {
    this.collectionView.clear();
    this.collectionView.render(data);
  }

  renderCart(quantity: number): void {
    //this.cartView.render(quantity);
  }

  resetFilters(): void {
    this.filterView.reset();
  }

  renderSort(sort: SortOptions): void {
    //this.sortView.render(sort);
  }
}

export default AppView;