import Product from './Product';
class Collection {
  private collection: Product[];
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