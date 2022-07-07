import { Action } from "../types/types";

class AppModel {
  onModelUpdated: (action: Action) => void;
  constructor(handler: (action: Action) => void) {
    this.onModelUpdated = handler;
  }

  getProducts() {
      return "Products Data"
  }

  updateModel(action: Action){
    switch (action.type) {
      case 'test':
        this.onModelUpdated({type: 'show-data', data: 'test data to show'});
        break
    }
  }
}

export default AppModel;