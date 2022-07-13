import { FilterItem, FilterName, FilterRange, IProduct, Mode } from "../types/types";
import { FilterGroups } from '../types/types';

class Filter {

  private static FilterGroups: FilterGroups = {};

  static toggleFilter(filter: FilterItem): void {
    if (filter.mode === Mode.ON) {
      if (this.FilterGroups[filter.name]) {
        this.FilterGroups[filter.name].push(filter.value.toLowerCase());
      }
      else {
        this.FilterGroups[filter.name] = [filter.value.toLowerCase()];
      }
    }
    else if (filter.mode === Mode.OFF) {
      if (this.FilterGroups[filter.name]) {
        this.FilterGroups[filter.name] = this.FilterGroups[filter.name].filter(v => v != filter.value.toLowerCase());
      }
    }
  }

  static setRangeFilter(range: FilterRange): void {
    this.FilterGroups[range.name] = range.values;
  }

  static filterProducts(collection: IProduct[]): IProduct[] {

    const groupsValues = Object.values(this.FilterGroups);
    if (!groupsValues || groupsValues.every(arr => arr.length === 0)) return collection;

    //const groupsEntries = Object.entries(this.FilterGroups);

    let filteredCollection: IProduct[] = collection;
    const groups = Object.keys(this.FilterGroups);
    groups.forEach(group => {
      if (this.FilterGroups[group].length > 0) {
        filteredCollection = this.applySameGroupFilters(group, this.FilterGroups[group], filteredCollection);
      }
    })
    // groupsEntries.forEach(group => {
    //   if (group[1].length > 0)
    //     filteredCollection = this.applySameGroupFilters(group[0], group[1], filteredCollection);
    // });

    return filteredCollection;
  }

  private static applySameGroupFilters(name: string, values: string[], collection: IProduct[]): IProduct[] {
    switch (name) {
      case FilterName.CATEGORY:
        return this.filterByCategory(values, collection);
      case FilterName.COLOR:
        return this.filterByColor(values, collection);
      case FilterName.YEAR:
        return this.filterByYear(values, collection);
      case FilterName.SIZE:
        return this.filterBySize(values, collection);
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

  private static filterByYear(values: string[], collection: IProduct[]): IProduct[] {
    const [start, end] = values.map(Number);
    return collection.filter(p => Number(p.year) >= start && Number(p.year) <= end);
  }

  private static filterBySize(values: string[], collection: IProduct[]): IProduct[] {
    return collection.filter (product => values.every(v => product.sizes.map(el => el.toLowerCase()).includes(v)));
  }

  static resetFilters(): void {
    this.FilterGroups = {};
  }

  static getFilters(): FilterGroups {
    return this.FilterGroups;
  }

  static isEmpty(): boolean {
    return (Object.keys(this.FilterGroups)).length === 0;
  }
}

export default Filter;