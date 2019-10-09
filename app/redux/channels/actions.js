import {createSocket} from '../../channels/socket';
import {onOpenConvo} from '../chat/actions';

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
export function createUserChannel(socket, id) {
  return function fetching(dispatch) {
    const userChannel = socket.channel('user:' + id, {});
    userChannel.on('open_convo', payload => dispatch(onOpenConvo(payload)));
    userChannel.join();
    dispatch(setUserChannel(userChannel));
  };
}

export function setupSignIn(token, nickname) {
  return function fetching(dispatch) {
    const socket = createSocket(token, nickname);
    socket.connect();
    dispatch(setSocket(socket));
    dispatch(setLobby(createLobbyChannel(socket)));
    dispatch(createUserChannel(socket, nickname));
  };
}
