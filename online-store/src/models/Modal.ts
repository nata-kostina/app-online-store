import { Actions, Handler, Messages } from "../types/types";

class Modal {


  static showModal(message: Messages): void {
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

    btnClose.addEventListener('click', (event) => this.closeModal());

    (document.querySelector('body') as HTMLBodyElement).insertAdjacentElement('beforeend', modal);

  }
  static closeModal(): void {
    const modal = document.querySelector('.modal') as HTMLDivElement;
    (document.querySelector('body') as HTMLBodyElement).removeChild(modal);
  }
}

export default Modal;