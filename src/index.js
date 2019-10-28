import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const initialState = {
    siteLang: localStorage.siteLand || 'ru',
    learnedLang: localStorage.learnedLand || 'eng'
};

function playlist(state = initialState, action) {
    if (action.type === 'SITE_LANG') {
        return { ...state, siteLang: action.payload };
    }
    if (action.type === 'LEARNED_LANG') {
        return { ...state, learnedLang: action.payload };
    }
    return state;
}

// const store = createStore(playlist, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__);
const store = createStore(playlist );

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
