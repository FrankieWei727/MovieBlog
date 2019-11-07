import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import reducer from "./Store/reducers/auth";
import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/lib/integration/react';
// import persist from './Store/configureStore';
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";

// const persistStore = persist();

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhances(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();