import { Actions, EventHandler, SortOption, SortOptions, SortOrder } from "../types/types";

class SortView {
  onModelChanged: EventHandler;

  constructor(handler: EventHandler) {
    this.onModelChanged = handler;

    const select = document.createElement('select');
    select.classList.add('select', 'select-sort');

    const opt = document.createElement('option');
    opt.classList.add('select-option');
    opt.value = 'default';
    opt.innerHTML = 'Default Sorting';

    select.insertAdjacentElement('beforeend', opt);
    select.insertAdjacentElement('beforeend', this.createOption({ option: SortOption.TITLE, order: SortOrder.ASC }, 'Sort by title: A-Z'));
    select.insertAdjacentElement('beforeend', this.createOption({ option: SortOption.TITLE, order: SortOrder.DESC }, 'Sort by title: Z-A'));
    select.insertAdjacentElement('beforeend', this.createOption({ option: SortOption.YEAR, order: SortOrder.ASC }, 'Sort by year: Old to New'));
    select.insertAdjacentElement('beforeend', this.createOption({ option: SortOption.YEAR, order: SortOrder.DESC }, 'Sort by year: New to Old'));

    select.addEventListener('change', (e) => handler(e, Actions.SORT));

    (document.querySelector('.sort') as HTMLDivElement).insertAdjacentElement('beforeend', select);
  }

  createOption(option: SortOptions, text: string): HTMLOptionElement {
    const opt = document.createElement('option');
    opt.classList.add('select-option');
    opt.value = `${option.option}-${option.order}`;
    opt.innerHTML = text;
    return opt;
  }

}

export default SortView;