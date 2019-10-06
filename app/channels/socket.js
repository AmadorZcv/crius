import {Socket} from 'phoenix';

import {hostUrl} from '../config/api';

let socket = null;

export function createSocket(token) {
  if (socket === null) {
    socket = new Socket(`${hostUrl}/socket`, {
      params: {token, user_id: 'asd'},
    });
  }
  return socket;
}
