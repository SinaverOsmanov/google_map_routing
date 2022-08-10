import {combineReducers} from "redux";
import {mapReducer} from "./ducks/app/reducer";
import {State} from "./ducks/globalTypes";

export default () =>
    combineReducers<State>({
        map: mapReducer
    })
