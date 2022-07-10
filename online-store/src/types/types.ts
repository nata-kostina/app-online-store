
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
  FILTER = "FILTER",
  UPDATE_COLLECTION = "UPDATE_COLLECTION",
  UPDATE_RANGE = "UPDATE_RANGE",
  RESET_FILTERS = "RESET_FILTERS",
  UPDATE_FILTERS = "UPDATE_FILTERS",
  CLEAR_SEARCH = "CLEAR_SEARCH",
  SEARCH = "SEARCH",
}
export enum SortOption {
  DEFAULT = "default",
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
export enum FilterName {
  CATEGORY = "category",
  COLOR = "color",
  YEAR = "year"
}

export interface FilterOptions {
  filter: FilterName;
  value: string;
}
export enum Mode {
  ON = "on",
  OFF = 'off'
}
export interface FilterItem {
  name: string;
  value: string;
  mode: string;
}

export type FilterGroups = {
  [key: string]: string[];
}

export type FilterRange = {
  name: string,
  values: string[],
  handle: number
}

export type SliderOptions = {
  start: string[] | number [];
  step: number;
  tooltips: boolean;
  connect: boolean;
  range: {
    'min': number;
    'max': number
  }
}

export enum Messages {
  EMPTY_COLLECTION = "Ooops! No products are found.",
  FULL_CART = "Ooops! Cart is full.",
}

export enum LocalStorageKeys {
  FILTER = 'filter',
  SORT = 'sort',
}