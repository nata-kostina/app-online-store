import { Actions, EventHandler, SortOption, SortOptions, SortOrder } from "../types/types";
import Sort from './../models/Sort';

class SortView {
  handler: EventHandler;
  sortOptions: HTMLOptionElement[];
  sort: HTMLDivElement;
  constructor(handler: EventHandler) {
    this.handler = handler;
    this.sortOptions = [];

    
    this.sort = document.createElement('div');
    this.sort.classList.add('sort');

    const select = document.createElement('select');
    select.classList.add('select', 'select-sort');

    const optgroupTitle = document.createElement('optgroup');
    optgroupTitle.label = "Sort by title:";
    optgroupTitle.classList.add('optgroup');

    const optgroupYear = document.createElement('optgroup');
    optgroupYear.label = "Sort by year:";
    optgroupYear.classList.add('optgroup');

    const defaultOpt = this.createOption({ option: SortOption.DEFAULT, order: SortOrder.ASC }, 'Default Sorting', SortOption.DEFAULT)

    this.sortOptions.push(defaultOpt);
    this.sortOptions.push(this.createOption({ option: SortOption.TITLE, order: SortOrder.ASC }, 'A-Z', SortOption.TITLE));
    this.sortOptions.push(this.createOption({ option: SortOption.TITLE, order: SortOrder.DESC }, 'Z-A', SortOption.TITLE));
    this.sortOptions.push(this.createOption({ option: SortOption.YEAR, order: SortOrder.ASC }, 'Old to New', SortOption.YEAR));
    this.sortOptions.push(this.createOption({ option: SortOption.YEAR, order: SortOrder.DESC }, 'New to Old', SortOption.YEAR));

    this.sortOptions.forEach(option => {
      if (option.dataset['group'] === SortOption.TITLE) {
        optgroupTitle.append(option);
      }
      if (option.dataset['group'] === SortOption.YEAR) {
        optgroupYear.append(option);
      }
    })

    select.insertAdjacentElement('beforeend', defaultOpt);
    select.insertAdjacentElement('beforeend', optgroupTitle);
    select.insertAdjacentElement('beforeend', optgroupYear);

    select.addEventListener('change', (e) => handler(e, Actions.SORT));

    this.sort.append(select);
  }
  
  applySort(): void {
    const sort = Sort.getSort();
    const option = this.sortOptions.find(opt => opt.value === `${sort.option}-${sort.order}`);
    if (option) {
      option.selected = true;
    }
  }

  createOption(option: SortOptions, text: string, group: string): HTMLOptionElement {
    const opt = document.createElement('option');
    opt.classList.add('select-option');
    opt.value = `${option.option}-${option.order}`;
    opt.innerHTML = text;
    opt.dataset['group'] = group;
    return opt;
  }
  getSortElement() {
    return this.sort;
  }
}

export default SortView;