import { IProduct, SortOption, SortOptions, SortOrder } from "../types/types";

class Sort {
  private static sort: SortOptions = { option: SortOption.DEFAULT, order: SortOrder.ASC };
  static getSort (): SortOptions {
    return this.sort;
  }
  static sortProducts(collection: IProduct[]): IProduct[] {   
    if (this.sort.option === SortOption.TITLE) {
      return this.sortByTitle(collection);
    }
    else if (this.sort.option === SortOption.YEAR) {
      return this.sortByYear(collection);
    }
    else if (this.sort.option === SortOption.DEFAULT) {
      return this.sortByDefault(collection);
    }
    return collection;
  }

  static setSort(option: string, order: string): void {

    switch (option) {
      case SortOption.TITLE:
        Sort.sort.option = SortOption.TITLE;
        break;
      case SortOption.YEAR:
        Sort.sort.option = SortOption.YEAR;
        break;
      default:
        Sort.sort.option = SortOption.DEFAULT;
        break;
    }

    switch (order) {
      case SortOrder.ASC:
        Sort.sort.order = SortOrder.ASC;
        break;
      case SortOrder.DESC:
        Sort.sort.order = SortOrder.DESC;
        break;
      default:
        Sort.sort.order = SortOrder.ASC;
        break;
    }
  }

  static sortByTitle(collection: IProduct[]): IProduct[] {
    if (this.sort.order === SortOrder.ASC) {
      return collection.sort((a, b) => {
        return a.title.localeCompare(b.title, undefined, { ignorePunctuation: true });
      });
    } else if (this.sort.order === SortOrder.DESC) {
      return collection.sort((a, b) => {
        return b.title.localeCompare(a.title, undefined, { ignorePunctuation: true });
      });
    }
    return collection;
  }

  static sortByYear(collection: IProduct[]): IProduct[] {
    if (this.sort.order === SortOrder.ASC) {
      return collection.sort((a, b) => Number.parseInt(a.year) - Number.parseInt(b.year));
    } else if (this.sort.order === SortOrder.DESC) {
      return collection.sort((a, b) => Number.parseInt(b.year) - Number.parseInt(a.year));
    }
    return collection;
  }

  static sortByDefault(collection: IProduct[]): IProduct[] {
    return collection.sort((a, b) => Number.parseInt(a.id) - Number.parseInt(b.id));
  }
}

export default Sort;