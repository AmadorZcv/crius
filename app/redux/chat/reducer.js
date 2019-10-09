import update from 'immutability-helper';
import {
  SET_ONLINE,
  SET_CHANNEL,
  SET_PUBLIC_KEY,
  SET_PRIVATE_KEY,
  SET_SHARED_KEY,
  SET_SECRET_KEY,
  SET_READY,
} from './actions';

const initialState = {
  online: {},
};

export default (state = initialState, action) => {
  let userId =
    action.payload && action.payload.userId ? action.payload.userId : null;
  let value =
    action.payload && action.payload.value ? action.payload.value : null;
  switch (action.type) {
    case SET_ONLINE:
      return {...state, online: action.payload};
    case SET_CHANNEL:
      return update(state, {
        online: {[userId]: {channel: {$set: value}}},
      });
    case SET_PUBLIC_KEY:
      return update(state, {
        online: {[userId]: {publicKey: {$set: value}}},
      });
    case SET_PRIVATE_KEY:
      return update(state, {
        online: {[userId]: {privateKey: {$set: value}}},
      });
    case SET_SHARED_KEY:
      return update(state, {
        online: {[userId]: {sharedKey: {$set: value}}},
      });
    case SET_SECRET_KEY:
      return update(state, {
        online: {[userId]: {secretKey: {$set: value}}},
      });
    case SET_READY:
      return update(state, {
        online: {[userId]: {ready: {$set: value}}},
      });
    default:
      return state;
  }
};
