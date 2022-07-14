class Footer {
  private footer: HTMLElement;
  constructor() {
    this.footer = document.createElement('footer');
    this.footer.classList.add('footer');

    const container = document.createElement('div');
    container.classList.add('container');

    const inner = document.createElement('div');
    inner.classList.add('footer__inner');

    const menu = document.createElement('ul');
    menu.classList.add('list', 'nav', 'footer-nav', 'col-s');
    menu.innerHTML = `<h3 class="list__title">Help</h3>
    <li class="list__item">
      <a href="#">Contact & FAQ</a>
    </li>

    <li class="list__item">
      <a href="#">Track Your Order</a>
    </li>

    <li class="list__item">
      <a href="#">Returns & Refunds</a>
    </li>

    <li class="list__item">
      <a href="#">Shipping & Delivery</a>
    </li>
    `;

    const col = document.createElement('div');
    col.classList.add('col-s');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    const img = document.createElement('img');
    img.classList.add('rss-logo');
    img.src = './assets/images/footer/rs_school_js.svg';

    const rsslink = document.createElement('a');
    rsslink.classList.add('link-rssschool');
    rsslink.innerHTML = `Rolling Scopes School, 2022`;
    rsslink.href = "https://rs.school/js/";

    const githubIcon = document.createElement('a');
    githubIcon.classList.add('github-icon');
    githubIcon.href ='https://github.com/nata-kostina';
    githubIcon.innerHTML = "<i class='fa-brands fa-github'></i>";

    imgContainer.append(img);
    col.append(imgContainer, rsslink);
    inner.append(menu, githubIcon, col);
    container.append(inner);
    this.footer.append(container);
  }

  getElement(): HTMLElement {
    return this.footer;
  }
}

export default Footer;
