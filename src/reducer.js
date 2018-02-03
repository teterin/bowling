import { handleActions } from 'redux-actions';
import actionTypes from './actions';
import { isGameOver, getCurrentFrameIdx, LAST_FRAME_IDX, MAX_SCORE } from './algorithm';

function start(state) {
  return { ...state, game: [] };
}

function next(state, { payload: score }) {
  if (isGameOver(state)) {
    return state;
  }
  const game = state.game.slice();
  game.push(score);
  if (score === MAX_SCORE && getCurrentFrameIdx(state) !== LAST_FRAME_IDX) {
    game.push(null);
  }

  return { ...state, game };
}

function addPlayer(state, { payload: name }) {
  const players = { ...state.players, [name]: name };
  return { ...state, players };
}

function removePlayer(state, { payload: name }) {
  const players = { ...state.players };
  delete players[name];

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
    game: [],
    players: {},
  },
);

export default reducer;
