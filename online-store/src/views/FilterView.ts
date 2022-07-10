import { Actions, EventHandler, SortOption, SortOptions, SortOrder } from "../types/types";
import SliderView from './SliderView';

class FilterView {
  onModelChanged: EventHandler;

  constructor(handler: EventHandler) {
    this.onModelChanged = handler;

    const filter = document.createElement('div');
    filter.classList.add('filter');
    filter.addEventListener('change', (e) => handler(e, Actions.FILTER));

    const fieldsetCategory = createFieldset('By category:', ['fieldset'], 3, 'category', ['Football', 'Baseball', 'Cycling']);
    const fieldsetColor = createFieldset('By color:', ['fieldset'], 3, 'color', ['Black', 'White', 'Grey', 'Red', 'Blue', 'Brown']);
    const fieldsetSize = createFieldset('By size:', ['fieldset'], 6, 'size', ['XS', 'S', 'M', 'L', 'XL', 'XXL']);
    const fieldsetBestsellers = createFieldset('Bestsellers:', ['fieldset'], 1, 'bestseller', ['Bestseller']);
    
    
    const sliderYearContainer = document.createElement('div');
    sliderYearContainer.classList.add('range','range-year');
    sliderYearContainer.id = 'range-year';    
    
    const sliderYear = new SliderView(handler, sliderYearContainer, {
      start: [2015, 2022],
      connect: true,
      step: 1,
      tooltips: true,
      range: {
        'min': 2015,
        'max': 2022
      },
    });


    const sliderPriceContainer = document.createElement('div');
    sliderYearContainer.classList.add('range','range-price');
    sliderYearContainer.id = 'range-price';    
    
    const sliderPrice = new SliderView(handler, sliderPriceContainer, {
      start: [50, 150],
      connect: true,
      step: 1,
      tooltips: true,
      range: {
        'min': 50,
        'max': 150
      },
    });
        
    filter.append(fieldsetCategory, fieldsetColor, fieldsetSize, fieldsetBestsellers, sliderYearContainer, sliderPriceContainer);
    document.querySelector('main')?.insertAdjacentElement('beforeend',filter);
  }
}

function createFieldset(text: string, classes: string[], num: number, name: string, values: string[]): HTMLFieldSetElement {
  const fieldset = document.createElement('fieldset');
  fieldset.classList.add(...classes);
  fieldset.innerHTML = text;

  for (let i = 0; i < num; i++) {
    const [ch, l] = createCheckbox(['filter-value'], name, values[i], `${name}_${i+1}`);
    fieldset.append(ch, l);
  }

  return fieldset;
}
function createCheckbox(classes: string[], name: string, value: string, id: string): [HTMLInputElement, HTMLLabelElement] {
  const checkbox = document.createElement('input');
  checkbox.classList.add(...classes);
  checkbox.type = 'checkbox';
  checkbox.name = name;
  checkbox.value = value;
  checkbox.id = id;

  const label = document.createElement('label');
  label.classList.add('label');
  label.htmlFor = id;
  label.innerHTML = value;

  return [checkbox, label];
}

export default FilterView;

