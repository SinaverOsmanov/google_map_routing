import {handleActions} from "redux-actions";
import {decrement, increment} from "./actions";

const defaultState = {
    count: 0,
    list: []
}

export const countReducer = handleActions({
    [increment]: (state: any, action:any) => {
        return {...state, count: state.count + action.payload}
    },
    [decrement]: (state: any, action:any) => {
        return {...state, count: state.count - action.payload}
    },
}, defaultState)

