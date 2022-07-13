class Intro {
  private intro: HTMLDivElement;
  constructor() {
    this.intro = document.createElement('div');
    this.intro.classList.add('intro');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    this.intro.append(imgContainer);

    const img = document.createElement('img');
    img.src = './assets/images/intro/mountains-background.jpg';
    imgContainer.append(img);
  }

  getElement(): HTMLDivElement{
    return this.intro;
  }
}

export default Intro;