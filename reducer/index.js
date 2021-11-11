

export const createStore=(reducer)=>{
    
    
    const subscribeCallbackArr = []

    let state;
    const dispatch = (action)=>{
        state = reducer(state,action)
        for (let i = 0; i <subscribeCallbackArr.length; i++) {
            subscribeCallbackArr[i]()
        }
    }
    const getState = ()=>{
        return state
    }
    const subscribe = (fn)=>{
        subscribeCallbackArr.push(fn)
    }
    const store = {
        dispatch,
        getState,
        subscribe
    }
    return store

}