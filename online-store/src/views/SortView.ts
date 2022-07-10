import { Actions, EventHandler, SortOption, SortOptions, SortOrder } from "../types/types";

class SortView {
  onModelChanged: EventHandler;

  constructor(handler: EventHandler) {
    this.onModelChanged = handler;  

    const select = document.createElement('select');
    select.classList.add('select', 'select-sort');

    const optgroupTitle  = document.createElement('optgroup');
    optgroupTitle.label = "Sort by title:";
    optgroupTitle.classList.add('optgroup');

    const optgroupYear  = document.createElement('optgroup');
    optgroupYear.label = "Sort by year:";
    optgroupYear.classList.add('optgroup');

    const opt = document.createElement('option');
    opt.classList.add('select-option');
    opt.value = 'default';
    opt.innerHTML = 'Default Sorting';

    select.insertAdjacentElement('beforeend', opt);
    optgroupTitle.insertAdjacentElement('beforeend', this.createOption({ option: SortOption.TITLE, order: SortOrder.ASC }, 'A-Z'));
    optgroupTitle.insertAdjacentElement('beforeend', this.createOption({ option: SortOption.TITLE, order: SortOrder.DESC }, 'Z-A'));
    optgroupYear.insertAdjacentElement('beforeend', this.createOption({ option: SortOption.YEAR, order: SortOrder.ASC }, 'Old to New'));
    optgroupYear.insertAdjacentElement('beforeend', this.createOption({ option: SortOption.YEAR, order: SortOrder.DESC }, 'New to Old'));
    select.insertAdjacentElement('beforeend', optgroupTitle);
    select.insertAdjacentElement('beforeend', optgroupYear);
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