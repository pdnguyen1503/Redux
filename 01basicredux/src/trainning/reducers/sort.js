var initialState = {
    By: 'status',
    value: 1 // 1 tang 0 giam
}
var myReducer = (state = initialState ,action)=>{
    if(action.type === 'SORT'){
        var {By, value} = action.sort;
        return {
            By:By, 
            value:value
        };
    }
    return state;
}

export default myReducer;