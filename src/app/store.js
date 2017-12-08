import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import { combineReducers } from 'redux';

// Reducers
import gameReducer from './game/game.reducer';
import pitchReducer from './pitch/pitch.reducer';
import slotReducer from './slot/slot.reducer';
import squadReducer from './squad/squad.reducer';
import userReducer from './user/user.reducer';

// Combine Reducers
var reducers = combineReducers({
  gameState: gameReducer,
  userState: userReducer,
  pitchState: pitchReducer,
  slotState: slotReducer,
  squadState: squadReducer
});

let store = createStore(reducers, applyMiddleware(logger));

export default store;
