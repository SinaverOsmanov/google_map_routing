import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {Provider} from 'react-redux'
import {rootStore} from "./store/rootStore";

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
    <Provider store={rootStore}>
        <App/>
    </Provider>, root
);

