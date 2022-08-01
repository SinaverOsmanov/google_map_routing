import {takeEvery} from "redux-saga/effects"
import {decrement, increment} from "./actions";

function* incrementWorker(any:any) {
    console.log(any, 'incrementWorker')
}

function* decrementWorker(any:any) {
    console.log(any, 'decrementWorker')
}


export function* countWatcher() {
    yield takeEvery(increment.toString(), incrementWorker)
    yield takeEvery(decrement.toString(), decrementWorker)
}
