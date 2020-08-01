import * as types from '../constants/ActionType';
// import { cloneElement } from 'react';

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}
var generateID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + '-' + s4() + '-' + s4();
};
var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    })
    return result;

}

var data = JSON.parse(localStorage.getItem('tasks'))
var initialState = data ? data : []; // chinh la store

var myReducer = (state = initialState, action) => {
    var id = '';
    var index = -1;
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            console.log(action)
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: (action.task.status === true || action.task.status === 'true') ? true : false
            }
            if (!task.id) {
                task.id = generateID();
                state.push(task);
            } else {
                console.log(task);
                index = findIndex(state, task.id)
                state[index] = task
                // state.push(task);
            }

            localStorage.setItem('tasks', JSON.stringify(state));
            // console.log(state)
            return [...state]; // coppy array moi roi tra ve, tranh tiep xuc vung nho
        case types.UPDATE_STATUS_TASKLIST:
            // var {tasks} = this.state; Store la cac tasks
            //state chinh la cac stasks
            id = action.id;
            index = findIndex(state, id);
            if (index !== -1) {
                // state[index].status = !state[index].status
                // tao 1 cloneTask tu viec coppy state[index], tu initial
                state[index] = {
                    ...state[index],
                    status: !state[index].status
                }
                localStorage.setItem('tasks', JSON.stringify(state))
                console.log(state)
            }
            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            if (index !== -1) {
                state.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(state));
            }
            return [...state]

        default: return state
    }
};

export default myReducer;