import { combineReducers } from 'redux';
import types from './types';

export const initialState = {
  isLoaded: false,
  laststream: [],
  isDisabled: false
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LASTSTREAM: {
      return { ...state, isLoaded: true, isDisabled: false, laststream: action.laststream };
    }
    case types.UPDATE_DISABLED: {
      return { ...state, isDisabled: action.isDisabled };
    }
    default:
      return state;
  }
};

export default combineReducers({
  laststream: statusReducer
});
