import { handleActions } from 'redux-actions';
import actionTypes from './actions';
import {
  isGameOver,
  getCurrentFrameIdx,
  isPlayerGameOver,
  LAST_FRAME_IDX,
  MAX_SCORE,
  FRAME_ROLL_NUMBER,
  FRAME_NUMBERS,
} from './algorithm';

function start(state) {
  return { ...state, currentPlayerIdx: 0, game: state.players.map(() => []) };
}

function shouldSwitchPlayer(table) {
  const { length } = table;
  if (
    isPlayerGameOver(table) ||
    (length < (FRAME_NUMBERS - 1) * FRAME_ROLL_NUMBER + 1 && length % FRAME_ROLL_NUMBER === 0)
  ) {
    return true;
  }
  return false;
}

function getNextPlayerIdx(state) {
  const { game, players } = state;
  let { currentPlayerIdx } = state;
  do {
    currentPlayerIdx += 1;
    if (currentPlayerIdx > players.length - 1) {
      currentPlayerIdx = 0;
    }
  } while (isPlayerGameOver(game[currentPlayerIdx]));
  return currentPlayerIdx;
}

function next(state, { payload: score }) {
  if (isGameOver(state.game)) {
    return state;
  }
  let { currentPlayerIdx } = state;
  const game = state.game.slice();
  const table = game[currentPlayerIdx].slice();
  game.splice(currentPlayerIdx, 1, table);

  table.push(score);
  if (score === MAX_SCORE && getCurrentFrameIdx(table) !== LAST_FRAME_IDX) {
    table.push(null);
  }

  if (shouldSwitchPlayer(table)) {
    currentPlayerIdx = getNextPlayerIdx(state);
  }

  return { ...state, game, currentPlayerIdx };
}

function addPlayer(state, { payload: name }) {
  const players = state.players.slice();
  players.push(name);

  return { ...state, players };
}

function removePlayer(state, { payload: name }) {
  const players = state.players.slice();
  const idx = players.indexOf(name);
  if (idx !== -1) {
    players.splice(idx, 1);
  }

  return { ...state, players };
}

const reducer = handleActions(
  {
    [actionTypes.START]: start,
    [actionTypes.NEXT]: next,
    [actionTypes.ADD_PLAYER]: addPlayer,
    [actionTypes.REMOVE_PLAYER]: removePlayer,
  },
  {
    players: ['Default'],
  },
);

export default reducer;
