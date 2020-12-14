import { createStore, applyMiddleware } from 'redux';
import {logger} from 'redux-logger'
import reducer from './reducer';
import thunk from 'redux-thunk';


const middlewares = [thunk];

if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}


const store = createStore(reducer, applyMiddleware(...middlewares))

export { store };