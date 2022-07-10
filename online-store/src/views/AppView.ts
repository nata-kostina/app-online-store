import { EventHandler, FilterGroups, IProduct } from "../types/types";
import ProductsCollectionView from './ProductsCollectionView';
import CartView from './CartView';
import ModalView from './ModalView';
import SortView from './SortView';
import FilterView from './FilterView';
import SliderView from './SliderView';
import Search from './Search';

class AppView {
  private handleUserActions: EventHandler;
  private collectionView: ProductsCollectionView;
  private cartView: CartView;
  private modalView: ModalView;
  private sortView: SortView;
  private filterView: FilterView;
  private search: Search;

  constructor(handler: EventHandler) {
    this.handleUserActions = handler;
    this.collectionView = new ProductsCollectionView(handler);
    this.cartView = new CartView(handler);
    this.modalView = new ModalView(handler);
    this.sortView = new SortView(handler);
    this.filterView = new FilterView(handler);
    this.search = new Search(handler);
   // this.SliderView = new SliderView(handler);
  }

  renderCollection(data: IProduct[]): void {
    this.collectionView.clear();
    this.collectionView.render(data);
  }

  renderCart(quantity: number): void {
    this.cartView.render(quantity);
  }

  renderFilters(filters: FilterGroups): void {
    this.filterView.reset();
  }
}

export default AppView;