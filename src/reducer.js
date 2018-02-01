import { handleActions } from 'redux-actions';
import actionTypes from './actions';

function start(state) {
  return { ...state, game: [] };
}

const reducer = handleActions(
  {
    [actionTypes.START]: start,
  },
  {
    game: [],
  },
);

export default reducer;
