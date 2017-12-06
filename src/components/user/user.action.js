import * as types from '../types';

export const setUserGames = (games) => {
  return {
    type: types.SET_USER_GAMES,
    payload: games
  }
};