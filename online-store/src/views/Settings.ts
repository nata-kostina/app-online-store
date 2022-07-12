import { Actions, EventHandler } from "../types/types";

class Settings {
  private handler: EventHandler;
  private settings: HTMLDivElement;

  constructor(handler: EventHandler) {
    this.handler = handler;

    this.settings = document.createElement('div');
    this.settings.classList.add('settings-bar');

    const btnReset = document.createElement('button');
    btnReset.classList.add('btn', 'btn-reset', 'btn-reset-settings');
    btnReset.innerHTML = 'Reset Settings';
    btnReset.addEventListener('click', (e) => this.handler(e, Actions.RESET_SETTINGS));

    this.settings.append(btnReset);
  }

  getSettingsElement(): HTMLDivElement {
    return this.settings;
  }
}

export default Settings;