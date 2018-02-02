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

const reducer = handleActions(
  {
    [actionTypes.START]: start,
    [actionTypes.NEXT]: next,
  },
  {
    game: [],
  },
);

export default reducer;
