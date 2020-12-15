import { HIDE_ANIMATION, SIGNED_IN, SIGNED_OUT } from './types';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const INITIAL_STATE = {
  user: null,
  firstLoad: true,
};

const animeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return {
        ...state,
        user: action.payload,
        firstLoad: true
      }

    case SIGNED_OUT:
      return {
        ...state,
        user: null,
        firstLoad: false
      };

    case HIDE_ANIMATION:
      return {
        ...state,
        firstLoad: false
      };

    default:
      return state;
  }
};

export default persistReducer(persistConfig, animeReducer);
