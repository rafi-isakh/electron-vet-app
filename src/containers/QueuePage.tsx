import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Queue from '../components/queue/Queue';
import { stateTypeObject, Dispatch } from '../reducers/types';
import { getPatients } from '../actions/patient';
import { getQueue, addQueue } from '../actions/queue';
import { setAddDialogState } from '../actions/dialogState';
import { getMedicalRecord } from '../actions/medicalRecord';
import { setActiveProfile } from '../actions/activeProfile';

class QueuePage extends React.Component<any, any> {
  
  componentDidMount() {
    if (this.props.auth.uid) {
      this.props.getQueue()
      this.props.getPatients()
    }
  }

  public render() {
    const { auth } = this.props

    if (!auth.uid) {
      return <Redirect to="/login" />
    }
    return <Queue 
      drawer={this.props.drawer}
      dialogState={this.props.dialogState}
      queueList={this.props.queueList}
      patients={this.props.patients}
      setAddDialogState={this.props.setAddDialogState}
      addQueue={this.props.addQueue}
      getMedicalRecord={this.props.getMedicalRecord}
      setActiveQueue={this.props.setActiveProfile}/>
  }
}

function mapStateToProps(state: stateTypeObject) {
  console.log(state)
  return {
    auth: state.firebase.auth,
    drawer: state.drawer,
    dialogState: state.dialogState,
    queueList: state.queue,
    patients: state.patients
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getPatients,
      getQueue,
      addQueue,
      setActiveProfile,
      setAddDialogState,
      getMedicalRecord
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(QueuePage);