import { IProduct } from "../types/types";

class Search {
  private static input = '';

  static getSearch(): string {
    return this.input;
  }

  static searchProducts(collection: IProduct[]):  IProduct[] {   
    const matched = collection.filter(product => {
      return product.title.toLowerCase().includes(this.input.toLowerCase());
    });
   return matched;
  }

  static setSearch(value: string): void {
      this.input = value;
  }

  static isEmpty(): boolean {
    return this.input.length === 0;
  }
  
  static resetSearch(): void {
    this.setSearch('');
  }
}

export default Search;