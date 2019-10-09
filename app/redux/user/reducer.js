import {SET_IS_LOGGED, SET_IS_FETCHING, SET_NICKNAME} from './actions';

const initialState = {
  isLogged: false,
  isFetching: false,
  nickname: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED:
      return {...state, isLogged: action.payload};

    case SET_IS_FETCHING:
      return {...state, isFetching: action.payload};
    case SET_NICKNAME:
      return {...state, nickname: action.payload};
    default:
      return state;
  }
};
