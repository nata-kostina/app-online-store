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
  }

  public async getProducts(url: string): Promise<IProduct[]> {
    const data = await fetch(url)
      .then(res => res.json())
      .then((data: IProduct[]) => data);
    this.defaultCollection.setCollection(data);
    return data;
  }

  public getDefaultCollection(): IProduct[] {
    return this.defaultCollection.getCollection() as IProduct[];
  }

  public getCurrentCollection(): IProduct[] {
    return this.currentCollection.getCollection() as IProduct[];
  }

  public setCurrentCollection(value: IProduct[]): void {
    this.currentCollection.setCollection(value);
  }

  public toggleProductInCart(id: string): void {
    this.cart.toggleProduct(id);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_CART);
  }

  public toggleProductInFavourites(id: string): void {
    this.wishlist.toggleProduct(id);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_WISHLIST);
  }

  public getQuantityInCart(): number {
    return this.cart.getQuantity();
  }

  public getQuantityInFavourite(): number {
    return this.wishlist.getQuantity();
  }
  public setFavourites(favourites: IFavouriteProduct[]) {
    this.wishlist.setFavourites(favourites);
    this.onModelUpdated(Actions.TOGGLE_PRODUCT_IN_WISHLIST);
  }
  public getFavouriteProducts(): IFavouriteProduct[] {
    return this.wishlist.getFavouriteProducts();
  }
  public getProductsInCart(): ICartProduct[] {
    return this.cart.getProducts();
  }
  public setProductsInCart(products: ICartProduct[]) {
    this.cart.setProducts(products);
  }
  public resetFavourites(): void {
    this.wishlist.reset();
  }
  public resetProductsInCart(): void {
    this.cart.reset();
  }

  public sortProducts(): void {
    const sortedCollection = Sort.sortProducts(this.currentCollection.getCollection());
    this.currentCollection.setCollection(sortedCollection);
  }

  public filterProducts(): void {
    let filteredCollection: IProduct[] = [];
    if (this.currentCollection.getCollection().length > 0) {
      filteredCollection = Filter.filterProducts(this.currentCollection.getCollection());
    }
    this.currentCollection.setCollection(filteredCollection);
  }

  public getFilters(): FilterGroups {
    return Filter.getFilters();
  }

  public resetFilters(): void {
    Filter.resetFilters();
    this.updateCollection();
    this.onModelUpdated(Actions.RESET_FILTERS);
  }
  public updateCollection(): void {
    this.searchProducts();
    this.filterProducts();
    this.sortProducts();
    this.onModelUpdated(Actions.UPDATE_COLLECTION);
  }

  public searchProducts(): void {
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