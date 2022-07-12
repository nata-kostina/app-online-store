import { Actions, FilterGroups, FilterItem, FilterOptions, Handler, IFavouriteProduct, Messages, SortOption, SortOptions } from "../types/types";
import { IProduct, ICartProduct } from './../types/types';
import Collection from './Collection';
import Cart from './Cart';
import Sort from './Sort';
import Filter from "./Filter";
import LocalStorage from './../controllers/LocalStorage';
import FavouriteProducts from './FavouriteProducts';


class AppModel {
  private onModelUpdated: Handler;
  private readonly defaultCollection: Collection;
  private currentCollection: Collection;
  private sortedFilteredCollection: Collection;
  private cart: Cart;
  private favouriteProducts: FavouriteProducts;

  constructor(handler: Handler) {
    this.onModelUpdated = handler;
    this.defaultCollection = new Collection();
    this.currentCollection = new Collection();
    this.sortedFilteredCollection = new Collection();

    this.cart = new Cart(handler);
    this.favouriteProducts = new FavouriteProducts(handler);
  }

  async getProducts(url: string): Promise<IProduct[]> {
    const data = await fetch(url)
      .then(res => res.json())
      .then((data: IProduct[]) => data);
    this.defaultCollection.setCollection(data);
    //this.onModelUpdated(Actions.INIT);
    return data;
  }
  applyUserSettingsToProducts(): void {
    this.filterProducts();
    this.sortProducts();
    this.sortedFilteredCollection.setCollection(this.getCurrentCollection());
    // applyFilters
    // apllySort
    //apply favs adn in cart
    this.appplyFavouriteProducts();
    this.onModelUpdated(Actions.UPDATE_COLLECTION);
  }

  appplyFavouriteProducts(): void {
    const favouriteProducts = this.getFavouriteProducts();
    const collection = this.getSortedFilteredCollection();
    //const filtered = 
    //if (favouriteProducts.find(fav => fav.id === this.item.dataset["id"]))
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

  getSortedFilteredCollection(): IProduct[] {
    return this.sortedFilteredCollection.getCollection();
  }

  setSortedFilteredCollection(value: IProduct[]): void {
    this.sortedFilteredCollection.setCollection(value);
  }

  toggleProductInCart(id: string): void {
    this.cart.toggleProduct(id);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_CART);
  }

  toggleProductInFavourites(id: string): void {
    this.favouriteProducts.toggleProduct(id);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_FAVS);
  }

  getQuantityInCart(): number {
    return this.cart.getQuantity();
  }

  getQuantityInFavourite(): number {
    return this.favouriteProducts.getQuantity();
  }
  setFavourites(favourites: IFavouriteProduct[]) {
    this.favouriteProducts.setFavourites(favourites);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_FAVS);
  }
  getFavouriteProducts(): IFavouriteProduct[] {
    return this.favouriteProducts.getFavouriteProducts();
  }
  resetFavourites(): void {
    this.favouriteProducts.reset();
  }
  resetProductsInCart(): void {
    this.cart.reset();
  }
  filterAndSortProducts(): void {
    this.filterProducts();
    this.sortProducts();
    this.sortedFilteredCollection.setCollection(this.getCurrentCollection());

    this.onModelUpdated(Actions.UPDATE_COLLECTION);

    // if (this.currentCollection.getCollection().length === 0)
    //   this.onModelUpdated(Actions.SHOW_MODAL, Messages.EMPTY_COLLECTION);
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

  resetFilters(): void {
    Filter.resetFilters();
    this.filterAndSortProducts();
    this.onModelUpdated(Actions.RESET_FILTERS);
  }
  searchProducts(value: string): void {
    const collection = this.getSortedFilteredCollection();
    const matched = collection.filter(product => {
      return product.title.toLowerCase().includes(value.toLowerCase());
    });
    this.setCurrentCollection(matched);
    this.onModelUpdated(Actions.UPDATE_COLLECTION);
  }
  getProductsInCart(): ICartProduct[] {
    return this.cart.getProducts();
  }
  setProductsInCart(products: ICartProduct[]) {
    this.cart.setProducts(products);
  }
}

export default AppModel;