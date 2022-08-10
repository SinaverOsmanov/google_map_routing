import {all} from "redux-saga/effects";
import {mapWatcher} from "./ducks/app/saga";

export default function* rootWatcher() {
    yield all([mapWatcher()])
}
