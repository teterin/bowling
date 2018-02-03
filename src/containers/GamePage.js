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
      table: items,
      total: getTotal(items),
    })),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ next }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
