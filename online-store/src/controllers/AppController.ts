import AppView from '../views/AppView';
import AppModel from './../models/AppModel';

class AppController {
  view: AppView;
  model: AppModel;
  dataURL: string;
  storeURL: string;

  constructor() {
    this.view = new AppView(this.handleUserActions.bind(this));
    this.model = new AppModel(this.onModelUpdated.bind(this));

    this.dataURL = "./data/data.json";
    this.storeURL = "./data/store.json";
  }

  start(): void {
    this.model.getProducts(this.dataURL);
  }

  handleUserActions(e: Event, type: string) {
    switch (type) {
      case "test":
        this.handleBtnClick();
    }
  }

  handleBtnClick(): void {
    console.log('Test');
  }

  onModelUpdated(type: string): void {
    switch (type) {
      case "init":
        this.view.drawCollection(this.model.getCollection());
        break;
      default:
        break;
    }
  }
}

export default AppController;