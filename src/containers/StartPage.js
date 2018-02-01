import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StartPage from 'components/StartPage';
import { start } from '../actions';

function mapDispatchToProps(dispatch) {
  return {
    start: bindActionCreators(start, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(StartPage);
