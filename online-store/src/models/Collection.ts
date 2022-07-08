import Product from './Product';
class Collection {
  collection: Product[];
  constructor() {
    this.collection = [];
  }
  setCollection(products: Product[]): void{
    this.collection = products;
  }

  getCollection(): Product[] {
    return this.collection;
  }
}

export default Collection;