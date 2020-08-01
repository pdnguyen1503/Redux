import status from './status';
import sort from './sort'; //reducers status
import {combineReducers} from "redux"; //reducers sort
// import myReducer from './sort';

const myReducer = combineReducers({
    status, //status: status
    sort //sort: sort
});

export default myReducer;