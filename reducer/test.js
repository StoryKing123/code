import {createStore} from './index'


const initState = {count:1}
const reducer = (state=initState,action)=>{
    switch(action.type){
        case 'SET_COUNT':
            return {...state,count:action.count}

        default:
            return state;
    }
}
let store = createStore(initState,reducer);
store.subscribe(()=>{
    console.log('change:'+store.getState)

})
store.dispatch({type:"SET_COUNT",count:3})
// curl -sL https://npm.taobao.org/mirrors/node/v14.18.1/node-v14.18.1-linux-x64.tar.xz | sudo -E bash -
