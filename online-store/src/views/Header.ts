class Header {
  private header: HTMLDivElement;
  constructor() {
    this.header = document.createElement('div');
    this.header.classList.add('header');
    
    const container = document.createElement('div');
    container.classList.add('container');
    this.header.append(container);

    const inner = document.createElement('div');
    inner.classList.add('header__inner');
    container.append(inner);

    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container');
    inner.append(cartContainer);    
  }

  getHeaderElement(): HTMLDivElement {
    return this.header;
  }
  
}

export default Header;