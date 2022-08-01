import { createActions } from 'redux-actions';

const {
    increment,
    decrement,
    setCount
}: {
    increment?: any;
    decrement?: any;
    setCount?: any;
} = createActions(
    'INCREMENT',
    'DECREMENT',
    'SET_COUNT',
);
export { increment, decrement, setCount};


