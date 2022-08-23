import {Action, handleActions} from "redux-actions";
import {addNewPoint, removePoint, setCurrentPoint, setMapPoints} from "./actions";
import {MapState} from "./types";
import {combineReducers} from "@reduxjs/toolkit";
import {PointType} from "../../../types";

const initialState: MapState = {
    points: [],
    currentPoint: null
}

const points = handleActions<any>(
    {
        [setMapPoints]: (state: PointType[] | [], action: Action<PointType[]>) => [...action.payload],
        [addNewPoint]: (state: PointType[] | [], action: Action<PointType>) => [...state, action.payload],
        [removePoint]: (state: PointType[] | [], action: Action<number>) => [...state.filter(route => route.id !== action.payload)]
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
