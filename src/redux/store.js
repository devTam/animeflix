import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import animeReducer from './reducer';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(animeReducer, applyMiddleware(...middlewares));

export { store };
