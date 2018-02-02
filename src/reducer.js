import { handleActions } from 'redux-actions';
import actionTypes from './actions';

function start(state) {
  return { ...state, game: [] };
}

function next(state, { payload: score }) {
  if (state.game.length === 10 * 2) {
    return state;
  }
  const game = state.game.slice();
  game.push(score);
  if (score === 10) {
    game.push(0);
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
