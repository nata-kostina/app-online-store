import { Product } from "../types/types";
import ProductView from './ProductView';

class ProductsCollectionView {
  collection: HTMLDivElement;
  constructor() {
    this.collection = document.querySelector('.collection') as HTMLDivElement;
  }
  
  static render(data: Product[]): void{
    data.forEach( p => ProductView.render(p))
  }

}

export default ProductsCollectionView;