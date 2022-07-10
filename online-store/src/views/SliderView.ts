import { Actions, EventHandler, SliderOptions } from "../types/types";
import * as noUiSlider from 'nouislider'

class SliderView {
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
      //debugger;
      const event = new CustomEvent('change', { detail: { name: 'year', values, handle } });
      this.handleUserActions(event, Actions.UPDATE_RANGE);
    });
   
  }

  reset(): void {
    (this.dragSlider.noUiSlider as noUiSlider.API).reset();
  }

}

export default SliderView;