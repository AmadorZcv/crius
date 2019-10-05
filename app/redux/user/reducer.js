import {SET_IS_LOGGED, SET_IS_FETCHING} from './actions';

const initialState = {
  isLogged: false,
  isFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED:
      return {...state, isLogged: action.payload};

    case SET_IS_FETCHING:
      return {...state, isFetching: action.payload};
    default:
      return state;
  }
};
