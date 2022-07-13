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

    const logo = document.createElement('h1');
    const logoLink = document.createElement('a');
    logo.classList.add('logo', 'col');
    logoLink.innerHTML = 'Rathnett';
    logoLink.href = '#';
    logo.append(logoLink);
    inner.append(logo);

    const menu = createMenu(['list', 'nav', 'nav-centre', 'col'], ['Home', 'Shop', 'Blog', 'Contact']);
    inner.append(menu);

    const menuRight = createMenu(['list', 'nav', 'nav-right', 'col'], []);

    const listItemCart = document.createElement('li');
    listItemCart.classList.add('nav__link');
    const linkCart = document.createElement('a');
    linkCart.classList.add('nav__link', 'cart-container');
    listItemCart.append(linkCart);

    const iconCart = document.createElement('i');
    iconCart.classList.add('fa-light', 'fa-cart-shopping');
    linkCart.append(iconCart);
    menuRight.append(listItemCart);

    const listItemWishlist = document.createElement('li');
    listItemWishlist.classList.add('nav__link');
    const linkWishlist = document.createElement('a');
    linkWishlist.classList.add('nav__link', 'wishlist-container');
    listItemWishlist.append(linkWishlist);
    listItemWishlist.append(linkWishlist);

    const icon = document.createElement('i');
    icon.classList.add('fa-light', 'fa-heart');
    linkWishlist.append(icon);
    menuRight.append(listItemWishlist);

    inner.append(menuRight);
  }

  getHeaderElement(): HTMLDivElement {
    return this.header;
  }

}
function createMenu(classes: string[], links: string[]): HTMLElement {
  const menu = document.createElement('ul');
  menu.classList.add(...classes);
  for (let i = 0; i < links.length; i++) {
    const li = document.createElement('li');
    li.classList.add('list__item');
    li.append(createNavLinks(links[i]));
    menu.append(li);
  }
  return menu;
}
function createNavLinks(text: string): HTMLAnchorElement {
  const link = document.createElement('a');
  link.classList.add('nav__link');
  link.href = '#';
  link.innerHTML = text;
  return link;
}

export default Header;