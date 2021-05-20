// how the data layer looks initially without adding somthing inside it.
export const initialState={
    user:null
}
//  like setting a variable and push the data inside this.
export const actionTypes={
    SET_USER:"SET_USER"
}

const reducer =(state,action)=>{
   // console.log(action);
    switch(action.type)
    {
        case actionTypes.SET_USER:return {
            ...state,user:action.user
        };
        default: return state;
    }
}
export default reducer;
