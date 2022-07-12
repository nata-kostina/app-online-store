import { Actions, EventHandler, FilterName, } from "../types/types";
import Slider from './Slider';
import Filter from './../models/Filter';

class FilterView {
  private onModelChanged: EventHandler;
  private filter: HTMLDivElement;
  private sliderYear: Slider;
  private sliderPrice: Slider;

  constructor(handler: EventHandler) {
    this.onModelChanged = handler;

    this.filter = document.createElement('div');
    this.filter.classList.add('filter');

    this.filter.addEventListener('change', (e) => {
      handler(e, Actions.FILTER);
    });

    const fieldsetCategory = createFieldset('By category:', ['fieldset'], 3, 'category', ['Football', 'Baseball', 'Cycling']);
    const fieldsetColor = createFieldset('By color:', ['fieldset'], 3, 'color', ['Black', 'White', 'Grey', 'Red', 'Blue', 'Brown']);
    const fieldsetSize = createFieldset('By size:', ['fieldset'], 6, 'size', ['XS', 'S', 'M', 'L', 'XL', 'XXL']);
    const fieldsetBestsellers = createFieldset('Bestsellers:', ['fieldset'], 1, 'bestseller', ['Bestseller']);

    const sliderYearContainer = document.createElement('div');
    sliderYearContainer.classList.add('range', 'range-year');
    sliderYearContainer.id = 'range-year';

    this.sliderYear = new Slider(handler, sliderYearContainer, {
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
    sliderYearContainer.classList.add('range', 'range-price');
    sliderYearContainer.id = 'range-price';

    this.sliderPrice = new Slider(handler, sliderPriceContainer, {
      start: [50, 150],
      connect: true,
      step: 1,
      tooltips: true,
      range: {
        'min': 50,
        'max': 150
      },
    });

    const btnReset = document.createElement('button');
    btnReset.classList.add('btn', 'btn-reset');
    btnReset.innerHTML = 'Reset';
    btnReset.addEventListener('click', (e) => handler(e, Actions.RESET_FILTERS));

    this.applyFilters();

    this.filter.append(fieldsetCategory, fieldsetColor, fieldsetSize, fieldsetBestsellers, sliderYearContainer, btnReset);
  }

  getFilterElement(): HTMLDivElement {
    return this.filter;
  }

  applyFilters(): void {
    const filters = Filter.getFilters();
    const filterNames = Object.keys(filters);

    filterNames.forEach(filterName => {
      if (filterName === FilterName.YEAR) {
        this.sliderYear.applyFilters(0, Number.parseInt(filters[filterName][0]));
        this.sliderYear.applyFilters(1, Number.parseInt(filters[filterName][1]));
      }
      else if (filterName === FilterName.PRICE) {
        this.sliderPrice.applyFilters(0, Number.parseInt(filters[filterName][0]));
        this.sliderPrice.applyFilters(1, Number.parseInt(filters[filterName][1]));
      }
      else {
        const elements = this.filter.getElementsByTagName('input');
        for (let i = 0; i < elements.length; i++) {
          if (filterName === elements[i].name) {
            if (filters[filterName].includes(elements[i].value.toLowerCase())) {
              elements[i].checked = true;
            }
          }
        }
      }
    });
  }

  reset(): void {
    const checkboxes: NodeListOf<HTMLInputElement> = this.filter.querySelectorAll('.filter-checkbox');
    checkboxes.forEach(ch => ch.checked = false);
    this.sliderYear.reset();
    this.sliderPrice.reset();
  }

}

function createFieldset(text: string, classes: string[], num: number, name: string, values: string[]): HTMLFieldSetElement {
  const fieldset = document.createElement('fieldset');
  fieldset.classList.add(...classes);
  fieldset.innerHTML = text;

  for (let i = 0; i < num; i++) {
    const [ch, l] = createCheckbox(['filter-value'], name, values[i], `${name}_${i + 1}`);
    fieldset.append(ch, l);
  }

  return fieldset;
}

function createCheckbox(classes: string[], name: string, value: string, id: string): [HTMLInputElement, HTMLLabelElement] {
  const checkbox = document.createElement('input');
  checkbox.classList.add(...classes, 'filter-checkbox');
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

