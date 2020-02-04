import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';
import './index.css';
import authReducer from "./Store/reducers/auth";
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore, combineReducers} from "redux";
import thunk from "redux-thunk";
import axios from 'axios';

axios.defaults.baseURL = ' http://0.0.0.0:45307/';

const rootReducer = combineReducers({
    auth: authReducer,
});


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhances(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();