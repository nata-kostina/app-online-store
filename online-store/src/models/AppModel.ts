import { Handler } from "../types/types";
import { Product } from './../types/types';
import Collection from './Collection';

class AppModel {
  onModelUpdated: Handler;
  collection: Collection;

  constructor(handler: Handler) {
    this.onModelUpdated = handler;
    this.collection = new Collection();
  }

  async getProducts(url: string): Promise<Product[]> {
    const data = await fetch(url)
      .then(res => res.json())
      .then((data: Product[]) => data);
    this.collection.setCollection(data);
    this.onModelUpdated('init');
    return data;
  }

  updateModel(type: string): void {
    switch (type) {
      case 'init':
        this.onModelUpdated('init');
        break;
      default:
        break;
    }
  }

  getCollection(): Product[] {
    return this.collection.getCollection() as Product[];
  }
}

export default AppModel;