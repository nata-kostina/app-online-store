import { Actions, EventHandler } from "../types/types";

class Search {
  private handler: EventHandler;
  constructor(handler: EventHandler) {
    this.handler = handler;
    
    const container = document.createElement('div');
    container.classList.add('search-container');

    const search = document.createElement('input');
    search.classList.add('input', 'input-search');
    search.type = 'search';
    search.placeholder = 'Search a product...';
    search.maxLength = 30;
    search.autocomplete = 'false';
    search.focus();
    search.addEventListener('input', (e) => {
      console.log(e);
      handler(e, Actions.SEARCH);
    });

    const btnClear = document.createElement('button');
    btnClear.classList.add('btn', 'btn-clear-search');
    btnClear.innerHTML = 'Clear';
    btnClear.addEventListener('click', (e) => this.handler(e, Actions.CLEAR_SEARCH));
    
    container.append(search, btnClear);
    document.querySelector('main')?.insertAdjacentElement('beforeend', container);

  }

  render(): void {
    return
  }

}

export default Search;