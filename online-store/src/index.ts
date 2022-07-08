import "./style.scss"
import AppController from './controllers/AppController';
import { CallbackVoid } from "./types/types";

const app = new AppController();
app.start();

function showMessage<T> (data: T, cb: CallbackVoid<T>){
  cb(data);
  console.log(data);
}
const showString: CallbackVoid<string> = () => {
  console.log('callback');
}
showMessage<string>('123', showString);