import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GamePage from 'components/GamePage';
import { next, start } from '../actions';
import {
  getCurrentScoreLimit,
  getCurrentFrameIdx,
  getCurrentRoll,
  isGameOver,
  getTotal,
} from '../algorithm';

function mapStateToProps(state) {
  return {
    currentScoreLimit: getCurrentScoreLimit(state),
    frame: getCurrentFrameIdx(state) + 1,
    roll: getCurrentRoll(state),
    isOver: isGameOver(state),
    game: state.game,
    total: getTotal(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ next, start }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
