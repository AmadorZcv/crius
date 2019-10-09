import {Socket} from 'phoenix';

import {hostUrl} from '../config/api';

let socket = null;

export function createSocket(token, userId) {
  if (socket === null) {
    socket = new Socket(`${hostUrl}/socket`, {
      params: {token, user_id: userId},
    });
  }
  return socket;
}
