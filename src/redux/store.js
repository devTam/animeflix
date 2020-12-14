import { createStore, applyMiddleware } from 'redux';
import {logger} from 'redux-logger'
import animeReducer from './reducer';
import thunk from 'redux-thunk';
import { persistStore } from "redux-persist";




const middlewares = [thunk];

if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}


const store = createStore(animeReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store)

export { store, persistor };