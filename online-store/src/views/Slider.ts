import { Actions, EventHandler, SliderOptions } from "../types/types";
import * as noUiSlider from 'nouislider'

class Slider {
  handleUserActions: EventHandler;
  dragSlider: noUiSlider.target;
  constructor(handler: EventHandler, container: HTMLDivElement, options: SliderOptions) {
    this.handleUserActions = handler;
    this.dragSlider = container;
    const mergedOptions = {
      ...options, format: {
        from: function (formattedValue: string) {
          return Number(formattedValue);
        },
        to: function (numericValue: number) {
          return Math.round(numericValue).toString();
        }
      },
    }
    noUiSlider.create(this.dragSlider, mergedOptions);

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