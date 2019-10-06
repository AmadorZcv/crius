import {SET_LOBBY, SET_SOCKET, SET_USER_CHANNEL} from './actions';

const initialState = {
  socket: null,
  userChannel: null,
  lobby: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return {...state, socket: action.payload};
    case SET_USER_CHANNEL:
      return {...state, userChannel: action.payload};
    case SET_LOBBY:
      return {...state, lobby: action.payload};
    default:
      return state;
  }
};
