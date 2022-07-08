import { Actions, Handler } from "../types/types";

class Modal {
  private onModelUpdated: Handler;
  private message: string;
  constructor(handler: Handler, message: string) {
    this.onModelUpdated = handler;
    this.message = message;
  }

  showModal(): void {
    this.onModelUpdated(Actions.SHOW_MODAL, this.message);
  }

  closeModal(): void {
    this.onModelUpdated(Actions.CLOSE_MODAL);
  }
}

export default Modal;