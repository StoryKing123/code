export const createStore = (reducer) => {
  const subscribeCallbackArr = [];

  let state;
  const dispatch = (action) => {
    state = reducer(state, action);
    for (let i = 0; i < subscribeCallbackArr.length; i++) {
      subscribeCallbackArr[i]();
    }
  };
  const getState = () => {
    return state;
  };
  const subscribe = (fn) => {
    subscribeCallbackArr.push(fn);
  };
  const store = {
    dispatch,
    getState,
    subscribe,
  };
  return store;
};

export const combineReducers = (reducerMap) => {
    const reducerKeys = Object.keys(reducerMap);

    const reducer = (state={},action)=>{
        const newState = {}
        const key = reducerKeys[i]
        const currentReducer = reducerMap[key]
        const prevState = state[key]
        newState[key] = currentReducer(prevState,action)

        return newState;
    }
    return reducer;
};
