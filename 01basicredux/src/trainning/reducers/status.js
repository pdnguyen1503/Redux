var initialState = false
// state o day la initialState
var myReducer = (state = initialState ,action)=>{
    if(action.type === 'TOGGLE_STATUS'){
        state = !state;
        return state;
    }
    return state;
}

export default myReducer;