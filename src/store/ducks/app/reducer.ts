import {handleActions} from "redux-actions";
import {setCurrentPoint, setMapPoints} from "./actions";
import {MapState} from "./types";
import {combineReducers} from "@reduxjs/toolkit";
import {PointType} from "../../../types";


const initialState: MapState = {
    points: [],
    currentPoint: null
}

const points = handleActions(
    {
        [setMapPoints]: (
            state: PointType[] | [],
            action: { payload: PointType[] }
        ) => [...action.payload],
    },
    initialState.points
)


const currentPoint = handleActions(
    {
        [setCurrentPoint]: (
            state: PointType | null,
            action: { payload: PointType }
        ) => action.payload,
    },
    initialState.currentPoint
)

export const mapReducer = combineReducers({
    points,
    currentPoint
})
