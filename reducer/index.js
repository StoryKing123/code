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
  const reducer = (state = {}, action) => {
    let newState = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      let key = reducerKeys[i];
      let currentReducer = reducerMap[key];
      let prevState = state[key];
      newState[key] = currentReducer(prevState, action);
    }
    return newState;
  };
  return reducer;
};


export const combineReducers2 =
  (slices) =>
  (state = {}, action) =>
    Object.keys(slices).reduce(
      (acc, prop) => ({
        ...acc,
        [prop]: slices[prop](state[prop], action),
      }),
      state
    );

// export const combineReducers2 = (reducers) => {
//   return (state, action) => {
//     const tempState = { ...state };
//     Object.keys(reducers).forEach((key) => {
//       tempState[key] = reducers[key](tempState[key], action);
//     });
//     return tempState;
//   };
// };

export const applyMiddleware = (middleware) => {
  function enhancer(createStore) {
    function newCreateStore(reducer) {
      const store = createStore(reducer);
      const func = middleware(store);
      const { dispatch } = store;
      const newDispatch = func(dispatch);
      return { ...store, dispatch: newDispatch };
    }
    return newCreateStore;
  }
  return enhancer;
};
