import {Presence} from 'phoenix';
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
export function talkTo(id) {}
