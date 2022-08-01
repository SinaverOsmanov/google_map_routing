
import {combineReducers} from "redux";
import {countReducer} from "./ducks/app/reducer";

export default () =>
    combineReducers({
        countReducer
    })
