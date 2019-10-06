import {getSocket} from './socket';

export async function connectToLobby() {
  let socket = await getSocket();
  let channel = socket.channel('lobby:lobby', {});
  channel.join();
}
