import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GamePage from 'components/GamePage';
import { next } from '../actions';
import {
  getCurrentScoreLimit,
  getCurrentFrameIdx,
  getCurrentRoll,
  isGameOver,
  getTotal,
  MAX_SCORE,
  FRAME_ROLL_NUMBER,
} from '../algorithm';

function mapStateToProps(state) {
  const { currentPlayerIdx, game, players } = state;
  const isInit = !!game;
  if (!isInit) {
    return { isInit };
  }
  const table = game[currentPlayerIdx];
  return {
    currentScoreLimit: getCurrentScoreLimit(table),
    frame: getCurrentFrameIdx(table) + 1,
    roll: getCurrentRoll(table),
    isOver: isGameOver(game),
    isInit,
    player: players[currentPlayerIdx],
    game: game.map((items, idx) => ({
      player: players[idx],
      table: items.map((item, i) => {
        if (item === MAX_SCORE) return 'X';
        if (
          i % FRAME_ROLL_NUMBER === 1 &&
          items[i - 1] !== MAX_SCORE &&
          items[i - 1] + item === MAX_SCORE
        ) {
          return '/';
        }
        return item;
      }),
      total: getTotal(items),
    })),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ next }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
