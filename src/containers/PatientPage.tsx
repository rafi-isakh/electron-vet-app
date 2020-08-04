import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch, stateTypeObject } from '../reducers/types';
import Patient from '../components/patient/Patient';
import { setActiveProfile } from '../actions/activeProfile';
import { setAddDialogState, setEditDialogState, setDeleteDialogState } from '../actions/dialogState';
import { addPatient, getPatients, editPatient, deletePatient } from '../actions/patient';
import { signIn } from '../actions/auth';

class PatientPage extends React.Component<any, any> {
  
  componentDidMount() {
    if (!this.props.auth.isEmpty) {
      this.props.getPatients()
    }
  }

  public render() {
    return <Patient
      auth={this.props.auth} 
      drawer={this.props.drawer}
      activeProfile={this.props.activeProfile}
      dialogState={this.props.dialogState}
      patients={this.props.patients}
      currentPatients={this.props.currentPatients}
      setActiveProfile={this.props.setActiveProfile}
      setAddDialogState={this.props.setAddDialogState}
      setEditDialogState={this.props.setEditDialogState}
      setDeleteDialogState={this.props.setDeleteDialogState}
      addPatient={this.props.addPatient}
      editPatient={this.props.editPatient}
      deletePatient={this.props.deletePatient}
      getPatients={this.props.getPatients}
      />
  }
}

function mapStateToProps(state: stateTypeObject) {
  console.log(state)
  return {
    auth: state.firebase.auth,
    drawer: state.drawer,
    activeProfile: state.activeProfile,
    dialogState: state.dialogState,
    patients: state.patients,
    currentPatients: state.patients,
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
      getPatients,
      signIn
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientPage);