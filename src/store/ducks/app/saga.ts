import {call, put, takeEvery} from "redux-saga/effects"
import {PointType} from "../../../types";
import {addNewPoint, getCurrentPoint, getMapPoints, removePoint, setCurrentPoint, setMapPoints} from "./actions";
import {getMapPointsRequest} from "./api/getMapPointsRequest";
import {Action} from "redux-actions";
import localStorageService from "../../../service/localStorage.service";

const {add, remove} = localStorageService()

function* getCurrentPointWorker() {
    const response: PointType[] = yield call(getMapPointsRequest)
    const [currentPoint] = response;

    yield put(setCurrentPoint(currentPoint ?? null))

}

function* getMapPointsWorker() {
    const response: PointType[] = yield call(getMapPointsRequest)

    yield put(setMapPoints(response))
}

function* addMapPointWorker(action: Action<PointType>) {
    add(action.payload)
}


function* removeMapPointWorker(action: Action<number>) {

    remove(action.payload)

    yield call(getCurrentPointWorker)
}


export function* mapWatcher() {
    yield takeEvery(getCurrentPoint.toString(), getCurrentPointWorker)
    yield takeEvery(getMapPoints.toString(), getMapPointsWorker)
    yield takeEvery(addNewPoint.toString(), addMapPointWorker)
    yield takeEvery(removePoint.toString(), removeMapPointWorker)
}
