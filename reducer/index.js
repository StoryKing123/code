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
    const reducerKeys = Object.keys(reducerMap)
    const reducer = (state={},action)=>{
        let newState = {}
        for(let i =0;i<reducerKeys.length;i++){
            // console.log('for')
            let key  = reducerKeys[i]
            let currentReducer=  reducerMap[key]
            let prevState = state[key]
            newState[key] = currentReducer(prevState,action)
        }
        return newState
    }
    return reducer;
};
