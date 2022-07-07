import { Action } from "../types/types";

class AppView {
  handleUserActions: (action: Action) => void;
  main: HTMLElement;
  updateBtn: HTMLButtonElement;

  constructor(handler: (action: Action) => void) {
    this.handleUserActions = handler;
    this.main = document.querySelector('main') as HTMLElement;
    this.updateBtn = this.main.querySelector('.btn-update') as HTMLButtonElement;
    this.updateBtn.addEventListener('click',  (e) => this.handleUserActions({type: 'test', data: "to update"}));
  }
  render(action: {type: string, data: string}) {
    switch (action.type){
      case 'init':
        this.main.insertAdjacentHTML('beforeend',action.data);
        break;
      case 'show-data':
        this.main.insertAdjacentText('beforeend', action.data);
        break;
    }
  }
}

export default AppView;