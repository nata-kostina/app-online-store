import { Actions, EventHandler } from "../types/types";

class Search {
  private handler: EventHandler;
  private searchContainer: HTMLDivElement;
  constructor(handler: EventHandler) {
    this.handler = handler;
    
    this.searchContainer = document.createElement('div');
    this.searchContainer.classList.add('search-container');

    const search = document.createElement('input');
    search.classList.add('input', 'input-search');
    search.type = 'search';
    search.placeholder = 'Search a product...';
    search.maxLength = 30;
    search.autocomplete = 'false';
    search.focus();
    search.addEventListener('input', (e) => {
       handler(e, Actions.SEARCH);
    });

    const btnClear = document.createElement('button');
    btnClear.classList.add('btn', 'btn-clear-search');
    btnClear.innerHTML = 'Clear';
    btnClear.addEventListener('click', (e) => this.handler(e, Actions.CLEAR_SEARCH));
    
    this.searchContainer.append(search, btnClear); 
  }

  getSearchElement(): HTMLDivElement {
    return this.searchContainer;
  }
  reset():void {
    const input = this.searchContainer.querySelector('.input-search') as HTMLInputElement;
    input.value = '';
  }
}

export default Search;