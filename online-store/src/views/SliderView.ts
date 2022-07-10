import { Actions, EventHandler, SliderOptions } from "../types/types";
import * as noUiSlider from 'nouislider'

class SliderView {
  handleUserActions: EventHandler;
  constructor(handler: EventHandler, container: HTMLDivElement, options: SliderOptions) {
    this.handleUserActions = handler;

    const dragSlider: noUiSlider.target = container;
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
    noUiSlider.create(dragSlider, mergedOptions);

    dragSlider.noUiSlider?.on('slide', (values, handle) => {
      //debugger;
      const event = new CustomEvent('update', { detail: { name: 'year', values, handle } });
      this.handleUserActions(event, Actions.UPDATE_RANGE);
    });
  }

  render(): void {
    return
  }

}

export default SliderView;