import { Actions, EventHandler, SliderOptions } from "../types/types";
import * as noUiSlider from 'nouislider'

class Slider {
  private handleUserActions: EventHandler;
  private dragSlider: noUiSlider.target;
  constructor(handler: EventHandler, container: HTMLDivElement, options: SliderOptions) {
    this.handleUserActions = handler;
    this.dragSlider = container;
    noUiSlider.create(this.dragSlider, options);

    (this.dragSlider.noUiSlider as noUiSlider.API).on('slide', (values, handle) => {
      const event = new CustomEvent('change', { detail: { name: 'year', values, handle } });
      this.handleUserActions(event, Actions.UPDATE_RANGE);
    });
   
  }

  applyFilters(handle: number, value: number): void {
    (this.dragSlider.noUiSlider as noUiSlider.API).setHandle(handle, value, true, true);
  }

  reset(): void {
    (this.dragSlider.noUiSlider as noUiSlider.API).reset();
  }

}

export default Slider;