import * as Message from '../constants/Message';
import * as Types from '../constants/ActionType'

var initialState = Message.MSG_WELLCOME;

const message = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHANGE_MESSAGE:
            return action.message
        default: return state;
    }
}

export default message;