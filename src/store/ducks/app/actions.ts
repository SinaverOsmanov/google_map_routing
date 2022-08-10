import {createActions} from 'redux-actions';

const {
    getMapPoints,
    setMapPoints,
    getCurrentPoint,
    setCurrentPoint
}: {
    getMapPoints?: any;
    setMapPoints?: any;
    getCurrentPoint?: any;
    setCurrentPoint?: any;
} = createActions(
    'GET_MAP_POINTS',
    'SET_MAP_POINTS',
    'GET_CURRENT_POINT',
    'SET_CURRENT_POINT',
);
export {getMapPoints, setMapPoints, getCurrentPoint, setCurrentPoint};


