import {createActions} from 'redux-actions';

const {
    getMapPoints,
    setMapPoints,
    getCurrentPoint,
    setCurrentPoint,
    addNewPoint,
    removePoint
}: {
    getMapPoints?: any;
    setMapPoints?: any;
    getCurrentPoint?: any;
    setCurrentPoint?: any;
    addNewPoint?: any;
    removePoint?: any
} = createActions(
    'GET_MAP_POINTS',
    'SET_MAP_POINTS',
    'GET_CURRENT_POINT',
    'SET_CURRENT_POINT',
    'ADD_NEW_POINT',
    'REMOVE_POINT',
);
export {getMapPoints, setMapPoints, getCurrentPoint, setCurrentPoint, addNewPoint, removePoint};


