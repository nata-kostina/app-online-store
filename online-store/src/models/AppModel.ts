import { Actions, FilterGroups, Handler, IFavouriteProduct } from "../types/types";
import { IProduct, ICartProduct } from '../types/types';
import Collection from './Collection';
import Cart from './Cart';
import Sort from './Sort';
import Filter from "./Filter";
import FavouriteProducts from './Wishlist';
import Search from './Search';


class AppModel {
  private onModelUpdated: Handler;
  private readonly defaultCollection: Collection;
  private currentCollection: Collection;

  private cart: Cart;
  private wishlist: FavouriteProducts;

  constructor(handler: Handler) {
    this.onModelUpdated = handler;
    this.defaultCollection = new Collection();
    this.currentCollection = new Collection();

    this.cart = new Cart(handler);
    this.wishlist = new FavouriteProducts(handler);
   // this.modal = 
  }

  async getProducts(url: string): Promise<IProduct[]> {
    const data = await fetch(url)
      .then(res => res.json())
      .then((data: IProduct[]) => data);
    this.defaultCollection.setCollection(data);
    //this.onModelUpdated(Actions.INIT);
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
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_CART);
  }

  toggleProductInFavourites(id: string): void {
    this.wishlist.toggleProduct(id);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_WISHLIST);
  }

  getQuantityInCart(): number {
    return this.cart.getQuantity();
  }

  getQuantityInFavourite(): number {
    return this.wishlist.getQuantity();
  }
  setFavourites(favourites: IFavouriteProduct[]) {
    this.wishlist.setFavourites(favourites);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_WISHLIST);
  }
  getFavouriteProducts(): IFavouriteProduct[] {
    return this.wishlist.getFavouriteProducts();
  }
  getProductsInCart(): ICartProduct[] {
    return this.cart.getProducts();
  }
  setProductsInCart(products: ICartProduct[]) {
    this.cart.setProducts(products);
  }
  resetFavourites(): void {
    this.wishlist.reset();
  }
  resetProductsInCart(): void {
    this.cart.reset();
  }
  sortProducts(): void {
    const sortedCollection = Sort.sortProducts(this.currentCollection.getCollection());
    this.currentCollection.setCollection(sortedCollection);
  }

  filterProducts(): void {
    let filteredCollection: IProduct[] = [];
    if (this.currentCollection.getCollection().length > 0) {
      filteredCollection = Filter.filterProducts(this.currentCollection.getCollection());
    }
    this.currentCollection.setCollection(filteredCollection);
  }

  getFilters(): FilterGroups {
    return Filter.getFilters();
  }

  resetFilters(): void {
    Filter.resetFilters();
    this.updateCollection();
    this.onModelUpdated(Actions.RESET_FILTERS);
  }
  updateCollection(): void {
    this.searchProducts();
    this.filterProducts();
    this.sortProducts();
    this.onModelUpdated(Actions.UPDATE_COLLECTION);
  }

  searchProducts(): void {
    const collection = this.getDefaultCollection();
    const input = Search.getSearch();
    if (!input) {
      this.currentCollection.setCollection(this.getDefaultCollection());
    }
    else {
      const matched = collection.filter(product => {
        return product.title.toLowerCase().includes(input.toLowerCase());
      });
      this.currentCollection.setCollection(matched);
    }
  }

}

export default AppModel;