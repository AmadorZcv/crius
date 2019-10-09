import {Presence} from 'phoenix';
import api from '../../config/api';
import {
  generate_private_key,
  keyGen,
  decryptMessage,
} from '../../config/crypto';
export const SET_ONLINE = 'SET_ONLINE';
export const setOnline = users => ({
  type: SET_ONLINE,
  payload: users,
});
export const SET_CHANNEL = 'SET_CHANNEL';
export const setChannel = channel => ({
  type: SET_CHANNEL,
  payload: channel,
});
export const SET_PUBLIC_KEY = 'SET_PUBLIC_KEY';
export const setPublicKey = (userId, value) => ({
  type: SET_PUBLIC_KEY,
  payload: {userId, value},
});
export const SET_PRIVATE_KEY = 'SET_PRIVATE_KEY';
export const setPrivateKey = (userId, value) => ({
  type: SET_PRIVATE_KEY,
  payload: {userId, value},
});
export const SET_SHARED_KEY = 'SET_SHARED_KEY';
export const setSharedKey = (userId, value) => ({
  type: SET_SHARED_KEY,
  payload: {userId, value},
});
export const SET_SECRET_KEY = 'SET_SECRET_KEY';
export const setSecretKey = (userId, value) => ({
  type: SET_SECRET_KEY,
  payload: {userId, value},
});
export const SET_READY = 'SET_READY';
export const setReady = (userId, value) => ({
  type: SET_READY,
  payload: {userId, value},
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
      sharedKey: null,
      publicKey: null,
      secretKey: null,
      privateKey: null,
      ready: false,
    };
  }
}
function setupPrivChannel(publicKey, room, nickname, socket) {
  return function fetching(dispatch) {
    const privateKey = generate_private_key();
    let privateChannel = socket.channel(room);
    dispatch(setChannel(privateChannel));
    dispatch(setPublicKey(nickname, publicKey));
    dispatch(setPrivateKey(nickname, privateKey));
    privateChannel.on('share_key', payload =>
      dispatch(onShareKey(payload, nickname, privateKey)),
    );
    privateChannel.on('start', payload =>
      dispatch(
        onStart(payload, privateChannel, nickname, privateKey, publicKey),
      ),
    );
    privateChannel.on('message', payload =>
      dispatch(onMessage(payload, nickname)),
    );
    privateChannel.join();

    privateChannel.push('start', {sharedKey: keyGen(publicKey, privateKey)});
  };
}

export function onOpenConvo(payload) {
  return function fetching(dispatch, getState) {
    const {socket} = getState().channels;
    const {room, public_key, nickname} = payload;
    dispatch(setupPrivChannel(public_key, room, nickname, socket));
  };
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
function onStart(payload, channel, nickname, privateKey, publicKey) {
  return function fetching(dispatch) {
    const {sharedKey} = payload;
    const secretKey = keyGen(sharedKey, privateKey);
    const mySharedKey = keyGen(publicKey, privateKey);
    dispatch(setSharedKey(nickname, sharedKey));
    dispatch(setSecretKey(nickname, secretKey));
    dispatch(setReady(nickname, true));
    channel.push('share_key', {sharedKey: mySharedKey});
  };
}
function onShareKey(payload, nickname, privateKey) {
  return function fetching(dispatch) {
    const {sharedKey} = payload;
    const secretKey = keyGen(sharedKey, privateKey);
    dispatch(setSharedKey(nickname, sharedKey));
    dispatch(setSecretKey(nickname, secretKey));
    dispatch(setReady(nickname, true));
  };
}
function onMessage(payload, nickname) {
  return function fetching(dispatch, getState) {
    const {secretKey} = getState().chat.online[nickname];
    const {message} = payload;
    console.log('Mensagem nova:', decryptMessage(message, secretKey));
  };
}

export function sendMessage(nickname, message) {
  return function fetching(dispatch, getState) {
    const {channel, ready} = getState().chat.online[nickname];
    if (ready) {
      channel.push('message', {message});
    }
  };
}

export function talkTo(nickname) {
  return function get(dispatch, getState) {
    const {socket} = getState().channels;
    api.get('/api/talk_to/' + nickname).then(response => {
      console.log('Response é', response.data);
      const {public_key, room} = response.data;
      dispatch(setupPrivChannel(public_key, room, nickname, socket));
    });
  };
}
