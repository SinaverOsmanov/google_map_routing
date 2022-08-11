import {Action, handleActions} from "redux-actions";
import {addNewPoint, setCurrentPoint, setMapPoints} from "./actions";
import {MapState} from "./types";
import {combineReducers} from "@reduxjs/toolkit";
import {PointType} from "../../../types";

const initialState: MapState = {
    points: [],
    currentPoint: null
}

const points = handleActions<PointType[]>(
    {
        [setMapPoints]: (state: PointType[] | [], action: Action<PointType[]>) => [...action.payload],
        [addNewPoint]: (state: PointType[] | [], action: Action<any>) => [...state, action.payload]
    },
    initialState.points
)


const currentPoint = handleActions<PointType | null>(
    {
        [setCurrentPoint]: (
            state: PointType | null,
            action: Action<PointType | null>
        ) => action.payload,
    },
    initialState.currentPoint
)

export const mapReducer = combineReducers({
    points,
    currentPoint
})
