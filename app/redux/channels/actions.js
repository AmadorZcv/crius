import {createSocket} from '../../channels/socket';

export const SET_SOCKET = 'channels/SET_SOCKET';
export const setSocket = socket => ({
  type: SET_SOCKET,
  payload: socket,
});
export const SET_LOBBY = 'channels/SET_LOBBY';
export const setLobby = lobby => ({
  type: SET_LOBBY,
  payload: lobby,
});
export const SET_USER_CHANNEL = 'channels/SET_USER_CHANNEL';
export const setUserChannel = user => ({
  type: SET_USER_CHANNEL,
  payload: user,
});

function createLobbyChannel(socket) {
  const channel = socket.channel('lobby:lobby', {});
  channel.join();

  return channel;
}
function createUserChannel(socket, id) {
  const userChannel = socket.channel('user:' + id, {});
  userChannel.join();

  return userChannel;
}

export function setupSignIn(token) {
  return function fetching(dispatch) {
    const socket = createSocket(token);
    socket.connect();
    dispatch(setSocket(socket));
    dispatch(setLobby(createLobbyChannel(socket)));
    dispatch(setUserChannel(createUserChannel(socket, 'asddd')));
  };
}
