import { Actions, FilterGroups, FilterItem, FilterOptions, Handler, SortOption, SortOptions } from "../types/types";
import { IProduct } from './../types/types';
import Collection from './Collection';
import Cart from './Cart';
import Sort from './Sort';
import Filter from "./Filter";

class AppModel {
  private onModelUpdated: Handler;
  private readonly defaultCollection: Collection;
  private currentCollection: Collection;
  private sortedFilteredCollection: Collection;
  private cart: Cart;

  constructor(handler: Handler) {
    this.onModelUpdated = handler;
    this.defaultCollection = new Collection();
    this.currentCollection = new Collection();
    this.sortedFilteredCollection = new Collection();

    this.cart = new Cart(handler);
  }

  async getProducts(url: string): Promise<IProduct[]> {
    const data = await fetch(url)
      .then(res => res.json())
      .then((data: IProduct[]) => data);
    this.defaultCollection.setCollection(data);
    this.currentCollection.setCollection(data);
    this.sortedFilteredCollection.setCollection(data);
    this.onModelUpdated(Actions.INIT);
    return data;
  }

  getDefaultCollection(): IProduct[] {
    return this.defaultCollection.getCollection() as IProduct[];
  }

  getCurrentCollection(): IProduct[] {
    return this.currentCollection.getCollection() as IProduct[];
  }

  setCurrentCollection(value: IProduct[]): void {
    this.currentCollection.setCollection(value);
  }

  toggleProductInCart(id: string): void {
    this.cart.toggleProduct(id);
  }

  getQuantityInCart(): number {
    return this.cart.getQuantity();
  }
  filterAndSortProducts(): void {
    this.filterProducts();
    this.sortProducts();
    this.onModelUpdated(Actions.UPDATE_COLLECTION);
    
    if (this.currentCollection.getCollection().length === 0)
      this.onModelUpdated(Actions.SHOW_MODAL, "Ooops! No products with such filters.");
  }
  sortProducts(): void {
    const sortedCollection = Sort.sortProducts(this.currentCollection.getCollection());
    this.currentCollection.setCollection(sortedCollection);
  }

  filterProducts(): void {
    const filteredCollection = Filter.filterProducts(this.defaultCollection.getCollection());
    this.currentCollection.setCollection(filteredCollection);
  }
  getFilters(): FilterGroups {
    return Filter.getFilters();
  }
  resetFilters():void {
    Filter.resetFilters();
    this.filterAndSortProducts();
    this.onModelUpdated(Actions.UPDATE_FILTERS);
  }
}

export default AppModel;