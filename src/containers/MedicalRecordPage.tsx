import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import MedicalRecord from "../components/medicalRecord/MedicalRecord";
import { stateTypeObject, Dispatch } from "../reducers/types";
import { getPatients } from '../actions/patient';

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
      patients={this.props.patients} />
  }
}

function mapStateToProps(state: stateTypeObject) {
    console.log(state)
    return {
      auth: state.firebase.auth,
      drawer: state.drawer,
      patients: state.patients,
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getPatients
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalRecordPage)
