import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GamePage from 'components/GamePage';
import { next } from '../actions';

function getCurrentScoreLimit({ game }) {
  const { length } = game;
  if (length % 2 === 0) {
    return 10;
  }
  return 10 - game[length - 1];
}

function getCurrentFrame({ game }) {
  const { length } = game;
  return Math.floor(length / 2 + 1);
}
function getCurrentRoll({ game }) {
  const { length } = game;
  return length % 2 === 0 ? 1 : 2;
}

function mapStateToProps(state) {
  return {
    currentScoreLimit: getCurrentScoreLimit(state),
    frame: getCurrentFrame(state),
    roll: getCurrentRoll(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ next }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
