import { createStore } from "redux";
import {status, sort} from "./actions/index";
import myReducer from './reducers/index'




const store = createStore(myReducer);

console.log('state default',store.getState()) /** lay State new */
// thuc thien cong viec thay doi status

// gui action len, se di vao reducer-> kiem tra action sau do no se thay doi status
// o day status la 1 function
store.dispatch(status()); // truyen acction ={type:'toggle' chinh la action tren reducer} 

console.log('TOGGLE_STATUS',store.getState());/** lay State new */

// gui sortAction len, se di vao reducer-> kiem tra sortAction sau do no se thay doi status
store.dispatch(sort({
    By:'name',
    value:-1
})); // truyen sortAction ={type:'SORT', sort{By:'name},value: -1} dua vao lam action
console.log('SORT',store.getState());/** lay State new */


