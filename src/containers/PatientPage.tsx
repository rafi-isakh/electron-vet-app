import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { counterStateType, Dispatch } from '../reducers/types';
import Patient from '../components/Patient';
import { setActiveProfile } from '../actions/activeProfile';

function mapStateToProps(state: counterStateType) {
  return {
    drawer: state.drawer,
    activeProfile: state.activeProfile
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setActiveProfile
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);