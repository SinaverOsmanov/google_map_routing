import {PointType} from "../../../types";

export type StateStatus = 'LOADING' | 'SUCCESS' | 'IDLE' | 'FAILURE';

export type MapState = {
    readonly points: PointType[] | [],
    readonly currentPoint: PointType | null
}

