import {createActions} from 'redux-actions';

const {
    getMapPoints,
    setMapPoints,
    getCurrentPoint,
    setCurrentPoint,
    addNewPoint,
}: {
    getMapPoints?: any;
    setMapPoints?: any;
    getCurrentPoint?: any;
    setCurrentPoint?: any;
    addNewPoint?: any;
} = createActions(
    'GET_MAP_POINTS',
    'SET_MAP_POINTS',
    'GET_CURRENT_POINT',
    'SET_CURRENT_POINT',
    'ADD_NEW_POINT',
);
export {getMapPoints, setMapPoints, getCurrentPoint, setCurrentPoint, addNewPoint};


