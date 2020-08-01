import * as types from '../constants/ActionType';

var initialState = {
    By: 'name',
    value: 1, // 1 tang -1 giam
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT:
            return {
                By: action.sort.By,
                value: parseInt(action.sort.value, 10)
            };
        default: return state
    }
};

export default myReducer;