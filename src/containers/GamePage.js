import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GamePage from 'components/GamePage';
import { next, start } from '../actions';

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

function isGameOver({ game }) {
  return game.length === 10 * 2;
}

function isStrike(game, frame) {
  return game[frame * 2] === 10;
}

function isSpare(game, frame) {
  return game[frame * 2] + game[frame * 2 + 1] === 10;
}

function getSumNextRolls(game, startIdx, count) {
  const { length } = game;
  let sum = 0;
  for (let i = startIdx; i < length && count > 0; i++) {
    if (game[i] !== null) {
      sum += game[i];
      count--;
    }
  }
  return sum;
}

function getTotal({ game }) {
  const { length } = game;
  let total = 0;
  for (let i = 0; i < length; i += 2) {
    const frame = Math.floor(i / 2);
    if (isStrike(game, frame)) {
      total += 10 + getSumNextRolls(game, i + 1, 2);
    } else if (isSpare(game, frame)) {
      total += 10 + getSumNextRolls(game, i + 1, 1);
    } else {
      total += game[i] + (i <= length - 2 ? game[i + 1] : 0);
    }
  }
  return total;
}

function mapStateToProps(state) {
  return {
    currentScoreLimit: getCurrentScoreLimit(state),
    frame: getCurrentFrame(state),
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
