import { Actions, EventHandler, FilterName, SliderOptions } from "../types/types";
import * as noUiSlider from 'nouislider'


class Slider {
  private handleUserActions: EventHandler;
  private dragSlider: noUiSlider.target;
  private name: FilterName;
  constructor(handler: EventHandler, container: HTMLDivElement, options: SliderOptions, name: FilterName) {
    this.handleUserActions = handler;
    this.dragSlider = container;
    noUiSlider.create(this.dragSlider, options);
    this.name = name;

    const debouncedSliding  = debounce(this.processSliding.bind(this));

    (this.dragSlider.noUiSlider as noUiSlider.API).on('slide', (values, handle) => {
      debouncedSliding(values, handle);
    });
   
  }

  processSliding(values: (string|number)[], handle: number): void {
    const event = new CustomEvent('change', { detail: { name: this.name, values, handle } });
    this.handleUserActions(event, Actions.UPDATE_RANGE);
  }

  applyFilters(handle: number, value: number): void {   
    (this.dragSlider.noUiSlider as noUiSlider.API).setHandle(handle, value, true, true);
  }

  reset(): void {
    (this.dragSlider.noUiSlider as noUiSlider.API).reset();
  }
  removeSliderEvents(): void {
    console.log('remove');
    (this.dragSlider.noUiSlider as noUiSlider.API).off('change');
  }

}

export default Slider;

function debounce(func: (values: (string|number)[], handle: number) => void, timeout = 500): (values: (string|number)[], handle: number) => void{
  let timer: NodeJS.Timeout;
  return (values: (string|number)[], handle: number) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(values, handle), timeout);
  };
}