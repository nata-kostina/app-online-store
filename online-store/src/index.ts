import "./style.scss"
import AppController from './controllers/AppController';
import { CallbackVoid } from "./types/types";
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
const app = new AppController();
app.start();