import {call, put, takeEvery} from "redux-saga/effects"
import {PointType} from "../../../types";
import {getCurrentPoint, getMapPoints, setCurrentPoint, setMapPoints} from "./actions";
import {getMapPointsRequest} from "./api/getMapPointsRequest";

function* getCurrentPointWorker() {
    const response: PointType[] = yield call(getMapPointsRequest)
    const [currentPoint] = response;

    yield put(setCurrentPoint(currentPoint))

}

function* getMapPointsWorker() {
    const response: PointType[] = yield call(getMapPointsRequest)

    yield put(setMapPoints(response))
}


export function* mapWatcher() {
    yield takeEvery(getCurrentPoint.toString(), getCurrentPointWorker)
    yield takeEvery(getMapPoints.toString(), getMapPointsWorker)
}
