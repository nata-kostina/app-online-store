import { FilterItem, FilterName, IProduct, Mode } from "../types/types";

class Filter {

  static filters: FilterItem[] = [];

  static toggleFilter(filter: FilterItem) {
    if (filter.mode === Mode.ON) {
      this.filters.push(filter);
    }
    else if (filter.mode === Mode.OFF) {
      this.filters = this.filters.filter(f => f.name != filter.name && f.value != f.value);
    }
  }

  static filterProducts(collection: IProduct[]): IProduct[] {
    if(this.filters.length === 0) return collection;
    let filteredCollection: IProduct[] = collection;
    this.filters.forEach(filter => {
      filteredCollection = this.applySeparateFilter(filter, filteredCollection);
    });
    return filteredCollection;
  }

  private static applySeparateFilter(filter: FilterItem, collection: IProduct[]): IProduct[] {
    switch (filter.name) {
      case FilterName.CATEGORY:
        return this.filterByCategory(filter.value, collection);
      default:
        break;

    }
    return collection;
  }

  static filterByCategory(category: string, collection: IProduct[]): IProduct[] {
    return collection.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

}

export default Filter;