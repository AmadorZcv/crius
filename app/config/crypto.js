import CryptoJS from 'crypto-js';
const n = 9007199254740991;
const maxKey = 11;
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function generate_private_key() {
  return getRandomInt(maxKey) + 1;
}

export function keyGen(base, key) {
  return Math.pow(base, key) % n;
}
export function encryptMessage(message, key) {
  return CryptoJS.AES.encrypt(message, key).toString();
}

export function decryptMessage(message, key) {
  let decryptedMessage = CryptoJS.AES.decrypt(message.toString(), key).toString(
    CryptoJS.enc.Utf8,
  );

  return decryptedMessage;
}
