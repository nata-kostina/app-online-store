import { Actions, EventHandler, FilterName, } from "../types/types";
import Slider from './Slider';
import Filter from './../models/Filter';
//import * as wn from 'wnumb/wNumb' ;

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

    const fieldsetCategory = createFieldset('Categories:', ['fieldset'], 3, 'category', ['Football', 'Baseball', 'Cycling']);
    const fieldsetPrice = createFieldset('Price:', ['fieldset', 'fieldset-price'], 0, 'price', []);
    const fieldsetYear = createFieldset('Year:', ['fieldset', 'fieldset-year'], 0, 'year', []);
    const fieldsetColor = createFieldset('Color:', ['fieldset'], 3, 'color', ['Black', 'White', 'Grey', 'Red', 'Blue', 'Brown']);
    const fieldsetSize = createFieldset('Size:', ['fieldset'], 6, 'size', ['XS', 'S', 'M', 'L', 'XL', 'XXL']);
    const fieldsetBestsellers = createFieldset('Bestsellers:', ['fieldset'], 1, 'popularity', ['Bestseller']);
    /*================================
    * YEAR
    =====================================*/
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
      format: {
        from: function (formattedValue: string) {
          return Number(formattedValue);
        },
        to: function (numericValue: number) {
          return `${Math.round(numericValue).toString()}`;
        }
      },
    });

    (fieldsetYear.querySelector('.fieldset__content') as HTMLDivElement).append(sliderYearContainer);
    /*================================
    * PRICE
    =====================================*/
    const sliderPriceContainer = document.createElement('div');
    sliderPriceContainer.classList.add('range', 'range-price');
    sliderPriceContainer.id = 'range-price';

    this.sliderPrice = new Slider(handler, sliderPriceContainer, {
      start: [50.00, 150.00],
      connect: true,
      step: 0.01,
      tooltips: true,      
      range: {
        'min': 50.00,
        'max': 100.00
      },
      format: {
        from: function (formattedValue: string) {
          return Number(formattedValue);
        },
        to: function (numericValue: number) {
          return `${numericValue.toFixed(2)} €`;
        }
      },
    });
    (fieldsetPrice.querySelector('.fieldset__content') as HTMLDivElement).append(sliderPriceContainer);

    const btnReset = document.createElement('button');
    btnReset.classList.add('btn', 'btn-reset');
    btnReset.innerHTML = 'Reset';
    btnReset.addEventListener('click', (e) => handler(e, Actions.RESET_FILTERS));

    this.applyFilters();

    this.filter.append(fieldsetCategory, fieldsetPrice, fieldsetColor, fieldsetSize, fieldsetBestsellers, fieldsetYear, btnReset);
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

  const title = document.createElement('h2');
  title.classList.add('fieldset__title');
  title.innerHTML = text;

  const content = document.createElement('div');
  content.classList.add('fieldset__content');

  fieldset.append(title, content);

  for (let i = 0; i < num; i++) {
    const label = createCheckbox(['filter-value'], name, values[i], `${name}_${i + 1}`);

    content.append(label);
  }

  return fieldset;
}

function createCheckbox(classes: string[], name: string, value: string, id: string): HTMLLabelElement {
  const checkbox = document.createElement('input');
  checkbox.classList.add(...classes, 'filter-checkbox');
  checkbox.type = 'checkbox';
  checkbox.name = name;
  checkbox.value = value;
  checkbox.id = id;

  const label = document.createElement('label');
  label.classList.add('filter-label');
  label.htmlFor = id;
  label.innerHTML = `${value}`;

  const icon = document.createElement('div');
  icon.classList.add('checkbox-icon');
  icon.innerHTML = '<i class="fa-solid fa-check"></i>';

  label.append(checkbox, icon);

  if (name === 'color') {
    const colorIcon = document.createElement('span');
    colorIcon.classList.add('color-icon');
    switch (value.toLowerCase()) {
      case 'black':
        colorIcon.dataset['code'] = '#000000'
        break;
      case 'white':
        colorIcon.dataset['code'] = '#ffffff'
        break;
      case 'red':
        colorIcon.dataset['code'] = '#DC282E'
        break;
      default:
        colorIcon.dataset['code'] = '#ffffff'
        break;

    }
    colorIcon.style.background = colorIcon.dataset['code'] as string;
    label.insertAdjacentElement('afterbegin', colorIcon);
  }
  return label;
}

export default FilterView;

