import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StartPage from 'components/StartPage';
import { start, addPlayer, removePlayer } from '../actions';

function mapStateToProps(state) {
  return {
    players: Object.keys(state.players),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addPlayer, removePlayer, start }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
