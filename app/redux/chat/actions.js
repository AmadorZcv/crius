import {Presence} from 'phoenix';
import api from '../../config/api';
export const SET_ONLINE = 'SET_ONLINE';
export const setOnline = users => ({
  type: SET_ONLINE,
  payload: users,
});
function subscribeToPresence(channel, callback) {
  let presence = new Presence(channel);
  presence.onSync(() => callback(presence));
}
function buildUser(id, online) {
  if (online[id]) {
    return online[id];
  } else {
    return {
      id: id,
      channel: null,
      privateKey: null,
      publicKey: null,
      newMessage: false,
    };
  }
}
export function listOnline() {
  return function fetching(dispatch, getState) {
    const {lobby} = getState().channels;
    const {online} = getState().chat;
    subscribeToPresence(lobby, presence => {
      const users = {};
      presence.list(id => {
        users[id] = buildUser(id, online);
      });
      dispatch(setOnline(users));
    });
  };
}
export function talkTo(nickname) {
  return function get(dispatch, getState) {
    const {socket} = getState().channels;
    api.get('/api/talk_to/Pedro').then(response => {
      let privateChannel = socket.channel(response.data.room);
      privateChannel.on('message', payload =>
        console.log('Mensagem no app', payload),
      );
      privateChannel.join();
      privateChannel.push('message', {message: 'Amador enviando'});
      console.log('Response foi', response.data);
    });
  };
}
