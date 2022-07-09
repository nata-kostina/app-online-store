import { Handler, IProduct, SortOption, SortOrder } from "../types/types";

import Product from './Product';

class Sort {
  private onModelUpdated: Handler;
  constructor(handler: Handler) {
    this.onModelUpdated = handler;
  }

  sortProducts(option: string, order: string, collection: IProduct[]): Product[] {
    if (option === SortOption.TITLE) {
      return this.sortByTitle(order, collection);
    }
    else if (option === SortOption.YEAR) {
      return this.sortByYear(order, collection);
    }
    return collection;
  }

  sortByTitle(order: string, collection: IProduct[]): IProduct[] {
    if (order === SortOrder.ASC) {
      return collection.sort((a, b) => {
        return a.title.localeCompare(b.title, undefined, { ignorePunctuation: true});
      });
    } else if (order === SortOrder.DESC) {
      return collection.sort((a, b) => {
        return b.title.localeCompare(a.title, undefined, { ignorePunctuation: true});
      });
    }
    return collection;
  }

  sortByYear(order: string, collection: IProduct[]): IProduct[]{
    if (order === SortOrder.ASC) {
      return collection.sort((a, b) => Number.parseInt(a.year) - Number.parseInt(b.year));
    } else if (order === SortOrder.DESC) {
      return collection.sort((a, b) => Number.parseInt(b.year) - Number.parseInt(a.year));
    }
    return collection;
  }
}

export default Sort;