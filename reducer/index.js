
 function createStore(reducer){
    let state;
    let listeners = [];

    function subscribe(fn){
        listeners.push(fn)
    }
    function dispatch(action){
        state = reducer(state,action)
        for(let i =0;i<listeners.length;i++){
            const listener = listeners[i]
            listener()
        }        
    }
    function getState(){

        return state;
    }


    const store = {
        subscribe,
        dispatch,
        getState
    }
    return store;
}
export {createStore}