import {all} from "redux-saga/effects";
import {countWatcher} from "./ducks/app/saga";

export default function* rootWatcher() {
    yield all([countWatcher()])
}
