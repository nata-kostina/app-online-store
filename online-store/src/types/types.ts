
export type CallbackVoid<T> = (data: T) => void;

export interface IProduct {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  color: string;
  sizes: string[];
  year: string;
  isBestseller: boolean;
  imgUrl: string;
  price: string;
}

export interface StoreItem {
  title: string;
  quantity: number;
}

export type Handler = (action: Actions, options?: string) => void;
export type EventHandler = (e: Event, action: Actions) => void;

export interface ICartProduct {
  id: string;
  title: string;
  quantity: number;
}

export enum Actions {
  INIT = "INIT",
  TOGGLE_PRODUCT_IN_CART = "TOGGLE_PRODUCT_IN_CART",
  SHOW_MODAL = "SHOW_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
  SORT = "SORT",
  UPDATE_COLLECTION = "UPDATE_COLLECTION",
}
export enum SortOption {
  TITLE = "title",
  YEAR = "year",  
}
export enum SortOrder {
  ASC = "ascending",
  DESC = "descending",
}
export interface SortOptions {
  option: SortOption;
  order: SortOrder;
}