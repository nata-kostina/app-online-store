import { Messages } from "../types/types";

class Modal {
  private static instance: Modal;
  private isShown: boolean;
  private constructor() {
    this.isShown = false;
  }

  public static getInstance(): Modal {
    if (!Modal.instance) {
      Modal.instance = new Modal();
    }
    return Modal.instance;
  }

  public showModal(message: Messages): void {
    if (this.isShown) return;
    this.isShown = true;
    const container = document.createElement('div');
    container.classList.add('modal-container');

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const inner = document.createElement('div');
    inner.classList.add('modal__inner');

    const text = document.createElement('p');
    text.classList.add('modal__text');
    text.innerHTML = message;

    const btnClose = document.createElement('button');
    btnClose.classList.add('btn', 'btn-close', 'btn-close_modal');
    btnClose.innerHTML = 'x';
    inner.append(text, btnClose);
    modal.append(inner);
    container.append(modal);

    btnClose.addEventListener('click', () => this.closeModal());

    (document.querySelector('body') as HTMLBodyElement).insertAdjacentElement('afterbegin', container);
    (document.querySelector('body') as HTMLBodyElement).classList.add('fixed');

  }

  public closeModal(): void {
    if (!this.isShown) return;
    this.isShown = false;
    const container = document.querySelector('.modal-container') as HTMLDivElement;
    (document.querySelector('body') as HTMLBodyElement).removeChild(container);
    (document.querySelector('body') as HTMLBodyElement).classList.remove('fixed');
  }
}

export default Modal;