import AsyncStorage from '@react-native-community/async-storage';
import {connectToLobby} from '../../channels/lobby';
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
export function signIn(token) {
  return function fetching(dispatch) {
    AsyncStorage.setItem('token', token);
    dispatch(setupSignIn(token));
    dispatch(setIsLogged(true));
  };
}
