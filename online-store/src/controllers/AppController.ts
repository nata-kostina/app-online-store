import { Action } from '../types/types';
import AppView from '../views/AppView';
import AppModel from './../models/AppModel';
class AppController {
  view: AppView;
  model: AppModel;
  constructor() {
    this.view = new AppView(this.handleUserActions.bind(this));
    this.model = new AppModel(this.onModelUpdated.bind(this));
  }

  start() {
    const products = this.model.getProducts();
    this.view.render({type: "init", data: products});
  }

  handleUserActions(action: Action) {  
    this.model.updateModel(action);    
  }

  onModelUpdated (action: Action) {
    this.view.render(action);
  }
}

export default AppController;