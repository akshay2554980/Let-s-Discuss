import React,{createContext,useContext,useReducer} from 'react';
export const StateContext = createContext();
// preparing the data layer which create context and its where all the things live
export const StateProvider=({reducer,initialState,children})=>(   //this is data layer takes higher order component and take 3 values
  <StateContext.Provider value={useReducer(reducer,initialState)}>
  {children}
  </StateContext.Provider>
);

export const useStateValue=()=>useContext(StateContext);
  