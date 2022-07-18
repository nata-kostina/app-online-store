import { IProduct } from '../types/types';
class Collection {
  private collection: IProduct[];
  constructor() {
    this.collection = [];
  }
  
  setCollection(products: IProduct[]): void{
    this.collection = products;
  }

  getCollection(): IProduct[] {
    return this.collection;
  }

  isEmpty(): boolean {
    return this.collection.length === 0;
  }
}

export default Collection;