import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import MedicalRecord from "../components/medicalRecord/MedicalRecord";
import { stateTypeObject, Dispatch } from "../reducers/types";
import { setAddDialogState } from '../actions/dialogState';
import { getPatients } from '../actions/patient';
import { getMedicalRecord, addMedicalRecord, createMedicalRecord } from '../actions/medicalRecord';

class MedicalRecordPage extends React.Component<any, any> {

  componentDidMount() {
    if (!this.props.auth.isEmpty) {
      this.props.getPatients()
    }
  }

  public render() {
    return <MedicalRecord 
      auth={this.props.auth}
      drawer={this.props.drawer}
      dialogState={this.props.dialogState}
      medicalRecord={this.props.medicalRecord}
      patients={this.props.patients}
      getMedicalRecord={this.props.getMedicalRecord}
      addRecord={this.props.addMedicalRecord}
      createMedicalRecord={this.props.createMedicalRecord}
      setAddDialogState={this.props.setAddDialogState} />
  }
}

function mapStateToProps(state: stateTypeObject) {
    console.log(state)
    return {
      auth: state.firebase.auth,
      drawer: state.drawer,
      dialogState: state.dialogState,
      patients: state.patients,
      medicalRecord: state.medicalRecord,
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setAddDialogState,
      getPatients,
      getMedicalRecord,
      addMedicalRecord,
      createMedicalRecord
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalRecordPage)
