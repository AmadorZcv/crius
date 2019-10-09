import AsyncStorage from '@react-native-community/async-storage';
import {setupSignIn} from '../channels/actions';
export const SET_IS_LOGGED = 'user/SET_IS_LOGGED';
export const setIsLogged = bool => ({
  type: SET_IS_LOGGED,
  payload: bool,
});
export const SET_IS_FETCHING = 'user/SET_IS_FETCHING';
export const setIsFetching = bool => ({
  type: SET_IS_FETCHING,
  payload: bool,
});
export const SET_NICKNAME = 'user/SET_NICKNAME';
export const setNickname = nickname => ({
  type: SET_NICKNAME,
  payload: nickname,
});

export function signIn(token, nickname) {
  return function fetching(dispatch) {
    console.log('nickname', nickname);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('nickname', nickname);
    dispatch(setupSignIn(token, nickname));
    dispatch(setIsLogged(true));
    dispatch(setNickname(nickname));
  };
}
