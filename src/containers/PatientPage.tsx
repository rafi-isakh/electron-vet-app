import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch, stateTypeObject } from '../reducers/types';
import Patient from '../components/Patient';
import { setActiveProfile } from '../actions/activeProfile';
import { setAddDialogState } from '../actions/dialogState';

function mapStateToProps(state: stateTypeObject) {
  console.log(state)
  return {
    drawer: state.drawer,
    activeProfile: state.activeProfile,
    dialogState: state.dialogState
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setActiveProfile,
      setAddDialogState
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);