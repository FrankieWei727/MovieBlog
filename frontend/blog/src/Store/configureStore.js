import {applyMiddleware, compose, createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import reducer from "./reducers/auth";
import thunk from "redux-thunk";

const persistConfig = {
  key: 'root',
  storage,
};

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  let store = createStore(persistedReducer,
    {},
    composeEnhances(
        applyMiddleware(thunk)
    ));
  let persistor = persistStore(store);
  return { store, persistor };
}


