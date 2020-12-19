import { SIGNED_IN, SIGNED_OUT } from './types';

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
        firstLoad: true,
      };

    case SIGNED_OUT:
      return {
        ...state,
        user: null,
        firstLoad: false,
      };

    default:
      return state;
  }
};

export default animeReducer;
