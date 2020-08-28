import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import MedicalRecord from "../components/medicalRecord/MedicalRecord";
import { stateTypeObject, Dispatch } from "../reducers/types";
import { setAddDialogState } from '../actions/dialogState';
import { getPatients } from '../actions/patient';
import { getMedicalRecord, addMedicalRecord, createMedicalRecord } from '../actions/medicalRecord';
import { getServices } from '../actions/service';

class MedicalRecordPage extends React.Component<any, any> {

  componentDidMount() {
    if (!this.props.auth.isEmpty) {
      this.props.getPatients()
    }
    if (_.isEmpty(this.props.services)) {
      this.props.getServices()
    }
  }

  public render() {
    return <MedicalRecord
      activeProfile={this.props.activeProfile} 
      auth={this.props.auth}
      drawer={this.props.drawer}
      dialogState={this.props.dialogState}
      medicalRecord={this.props.medicalRecord}
      patients={this.props.patients}
      services={this.props.services}
      getMedicalRecord={this.props.getMedicalRecord}
      addRecord={this.props.addMedicalRecord}
      createMedicalRecord={this.props.createMedicalRecord}
      setAddDialogState={this.props.setAddDialogState} />
  }
}

function mapStateToProps(state: stateTypeObject) {
    console.log(state)
    return {
      activeProfile: state.activeProfile,
      auth: state.firebase.auth,
      drawer: state.drawer,
      dialogState: state.dialogState,
      patients: state.patients,
      medicalRecord: state.medicalRecord,
      services: state.services
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      addMedicalRecord,
      createMedicalRecord,
      getMedicalRecord,
      getPatients,
      getServices,
      setAddDialogState
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalRecordPage)
