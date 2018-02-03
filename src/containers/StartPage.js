import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StartPage from 'components/StartPage';
import { start, addPlayer, removePlayer } from '../actions';

function mapStateToProps({ players }) {
  return {
    players,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addPlayer, removePlayer, start }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
