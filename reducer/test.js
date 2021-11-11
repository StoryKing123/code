import { createStore } from "./index.js";

const initState = { count: 3 };
const reducer = (state = initState, action) => {
    // console.log(state)
    // console.log(action)
  switch (action.type) {
    case "ADD_COUNT":
      return { ...state, count: state.count + action.count };
    default:
      return state;
  }
};
const store = createStore(reducer);


store.subscribe(()=>{console.log(store.getState())})
store.dispatch({type:'ADD_COUNT',count:3})
store.dispatch({type:'ADD_COUNT',count:5})
