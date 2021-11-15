import { createStore, combineReducers } from "./index.js";

const initCountState = {
  count: 1,
};
const initCount2State = {
  count: 5,
};
const countReducer = (state = initCountState, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
};
const count2Reducer = (state = initCount2State, action) => {
  switch (action.type) {
    case "ADD2":
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
};

const reducer = combineReducers({ count: countReducer, count2: count2Reducer });
const store = createStore(reducer);
store.subscribe(()=>{console.log(store.getState())})
store.dispatch({type:"ADD",payload:2})
store.dispatch({type:'ADD2',payload:5})