import "./style.scss"
class App {
  title: string;
  constructor() {
    this.title = 'Online-store';
  }
}

const app = new App();
console.log(app.title);