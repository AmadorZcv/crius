import {combineReducers} from 'redux';

import user from './user/reducer';
import channels from './channels/reducer';
import chat from './chat/reducer';
export default combineReducers({
  user,
  channels,
  chat,
});
