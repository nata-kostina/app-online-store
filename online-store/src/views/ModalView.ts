import { Actions, EventHandler} from "../types/types";

class ModalView {
  private handleClick: EventHandler;
  constructor(handler: EventHandler) {
    this.handleClick = handler;
  }

  render(message: string): void {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const inner = document.createElement('div');
    inner.classList.add('modal__inner');

    const text = document.createElement('p');
    text.classList.add('modal__text');
    text.innerHTML = message;

    const btnClose = document.createElement('button');
    btnClose.classList.add('btn', 'btn-close', 'btn-close_modal');

    inner.insertAdjacentElement('beforeend', text);
    inner.insertAdjacentElement('beforeend', btnClose);
    modal.insertAdjacentElement('beforeend', inner);

    btnClose.addEventListener('click', (event) => this.handleClick(event, Actions.CLOSE_MODAL));

    (document.querySelector('body') as HTMLBodyElement).insertAdjacentElement('beforeend', modal);

  }

  clear(): void {
      const modal = document.querySelector('.modal') as HTMLDivElement;
      (document.querySelector('body') as HTMLBodyElement).removeChild(modal);
  }

}

export default ModalView;