import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import learnedCount from './src-core/helper/learnedCount/learnedCount'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

export const defaultColor = {
    fontColor: 'white',
    firstColor: '#40ac62',
    secondColor: '#369656',
    backColor: 'white',
};

const initialState = {
    siteLang: localStorage.siteLand || 'ru',
    learnedLang: localStorage.learnedLand || 'eng',
    fontColor: localStorage.fontColor || defaultColor.fontColor,
    firstColor: localStorage.firstColor || defaultColor.firstColor,
    secondColor: localStorage.secondColor || defaultColor.secondColor,
    backColor: localStorage.backColor || defaultColor.backColor,
    userData: localStorage.userData || '',
    learnedCount: learnedCount(),
};

function playlist(state = initialState, action) {
    if (action.type === 'SITE_LANG') return { ...state, siteLang: action.payload };
    if (action.type === 'LEARNED_LANG') return { ...state, learnedLang: action.payload };
    if (action.type === 'FONT_COLOR') return { ...state, fontColor: action.payload };
    if (action.type === 'BACK_COLOR') return { ...state, backColor: action.payload };
    if (action.type === 'FIRST_COLOR') return { ...state, firstColor: action.payload };
    if (action.type === 'SECOND_COLOR') return { ...state, secondColor: action.payload };
    if (action.type === 'USER_DATA') return { ...state, userData: action.payload };
    if (action.type === 'LEARNED_COUNT') return { ...state, learnedCount: action.payload };
    return state;
}

// const store = createStore(playlist, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__);
const store = createStore(playlist);

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