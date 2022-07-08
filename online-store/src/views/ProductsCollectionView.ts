import { EventHandler, IProduct } from "../types/types";
import ProductView from './ProductView';

class ProductsCollectionView {
  private collection: HTMLDivElement;
  private productView: ProductView;
  constructor(handler: EventHandler) {
    this.productView = new ProductView(handler);
    this.collection = document.querySelector('.collection') as HTMLDivElement;   
  }
  
  render(data: IProduct[]): void{
    data.forEach( p => this.productView.render(p))
  }

}

export default ProductsCollectionView;