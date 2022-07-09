import { Actions, EventHandler, SortOption, SortOptions, SortOrder } from "../types/types";

class FilterView {
  onModelChanged: EventHandler;

  constructor(handler: EventHandler) {
    this.onModelChanged = handler;

    const filter = document.querySelector('.filter');
    filter?.addEventListener('change', (e) => handler(e, Actions.FILTER));
  }
}

export default FilterView;

