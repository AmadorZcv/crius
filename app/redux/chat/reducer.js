import {SET_ONLINE} from './actions';

const initialState = {
  online: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ONLINE:
      return {...state, online: action.payload};

    default:
      return state;
  }
};
