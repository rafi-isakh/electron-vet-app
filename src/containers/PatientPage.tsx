import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Dispatch, stateTypeObject } from '../reducers/types';
import Patient from '../components/Patient';
import { setActiveProfile } from '../actions/activeProfile';
import { setAddDialogState, setEditDialogState, setDeleteDialogState } from '../actions/dialogState';
import { addPatient, getPatients, editPatient, deletePatient } from '../actions/patient';

function mapStateToProps(state: stateTypeObject) {
  console.log(state)
  return {
    drawer: state.drawer,
    activeProfile: state.activeProfile,
    dialogState: state.dialogState,
    patients: state.firestore.ordered.patients,
    currentPatients: state.firestore.data.patients
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setActiveProfile,
      setAddDialogState,
      setEditDialogState,
      setDeleteDialogState,
      addPatient,
      editPatient,
      deletePatient,
      getPatients
    },
    dispatch
  );
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'patients'}
  ])
)(Patient);