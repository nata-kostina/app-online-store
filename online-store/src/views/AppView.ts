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
  private cartView: CartView;
  private sortView: SortView;
  private filterView: FilterView;
  private search: Search;

  constructor(handler: EventHandler) {
    this.handleUserActions = handler;
    this.collectionView = new ProductsCollectionView(handler);
    this.cartView = new CartView();
    this.sortView = new SortView(handler);
    this.filterView = new FilterView(handler);
    this.search = new Search(handler);
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

  renderSort(sort: SortOptions): void {
    this.sortView.render(sort);
  }
}

export default AppView;