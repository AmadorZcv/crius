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
