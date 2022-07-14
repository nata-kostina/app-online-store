import { Actions, EventHandler } from "../types/types";

class ResetBtn {
  private handler: EventHandler;
  private btnReset: HTMLButtonElement;

  constructor(handler: EventHandler) {
    this.handler = handler;

    this.btnReset = document.createElement('button');
    this.btnReset.classList.add('btn', 'btn-reset-settings');
    this.btnReset.innerHTML = 'Reset Settings';
    this.btnReset.addEventListener('click', (e) => this.handler(e, Actions.RESET_SETTINGS));

  }

  getSettingsElement(): HTMLButtonElement {
    return this.btnReset;
  }
}

export default ResetBtn;