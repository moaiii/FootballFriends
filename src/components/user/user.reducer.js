import * as types from '../types';
import { userInfo } from 'os';

const initialState = {
  myGames: [],
  myFriends: []
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_USER_GAMES:
      return Object.assign({}, state, {
        myGames: action.payload
      });

    case types.GET_USER_FRIENDS:
      return Object.assign({}, state, {
        myFriends: action.payload
      });
  }
  return state;
};

default export userReducer;