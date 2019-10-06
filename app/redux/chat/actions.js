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
export function listOnline() {
  return function fetching(dispatch, getState) {
    const {lobby} = getState().channels;
    subscribeToPresence(lobby, presence => {
      const users = [];
      presence.list(id => users.push(id));
      dispatch(setOnline(users));
    });
  };
}
