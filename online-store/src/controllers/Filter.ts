import { FilterItem, FilterName, IProduct, Mode } from "../types/types";
import { FilterGroup } from './../types/types';

class Filter {

  static filterGroups: FilterGroup = {};

  static toggleFilter(filter: FilterItem): void {
    if (filter.mode === Mode.ON) {
      if (this.filterGroups[filter.name]) {
        this.filterGroups[filter.name].push(filter.value);
      }
      else {
        this.filterGroups[filter.name] = [filter.value];
      }
    }
    else if (filter.mode === Mode.OFF) {

      if (this.filterGroups[filter.name]) {
        this.filterGroups[filter.name] = this.filterGroups[filter.name].filter(v => v != filter.value);
      }
    }
  }

  static filterProducts(collection: IProduct[]): IProduct[] {

    const groupsValues = Object.values(this.filterGroups);
    if (groupsValues.every(arr => arr.length === 0)) return collection;

    const groupsEntries = Object.entries(this.filterGroups);

    let filteredCollection: IProduct[] = collection;

    groupsEntries.forEach(group => {
      if (group[1].length > 0)
        filteredCollection = this.applySameGroupFilters(group[0], group[1], filteredCollection);
    });

    return filteredCollection;
  }

  private static applySameGroupFilters(name: string, values: string[], collection: IProduct[]): IProduct[] {
    switch (name) {
      case FilterName.CATEGORY:
        return this.filterByCategory(values, collection);
      case FilterName.COLOR:
        return this.filterByColor(values, collection);
      default:
        break;
    }
    return collection;
  }

  private static filterByCategory(values: string[], collection: IProduct[]): IProduct[] {
    return collection.filter(p => values.includes(p.category.toLowerCase()));
  }

  private static filterByColor(values: string[], collection: IProduct[]): IProduct[] {
    return collection.filter(p => values.includes(p.color.toLowerCase()));
  }
}

export default Filter;