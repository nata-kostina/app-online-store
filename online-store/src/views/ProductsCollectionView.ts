import { EventHandler, Product } from "../types/types";
import ProductView from './ProductView';

class ProductsCollectionView {
  collection: HTMLDivElement;
  productView: ProductView;
  constructor(handler: EventHandler) {
    this.productView = new ProductView(handler);
    this.collection = document.querySelector('.collection') as HTMLDivElement;   
  }
  
  render(data: Product[]): void{
    data.forEach( p => this.productView.render(p))
  }

}

export default ProductsCollectionView;