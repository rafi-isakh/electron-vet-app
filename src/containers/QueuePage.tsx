import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Queue from '../components/queue/Queue';
import { stateTypeObject, Dispatch } from '../reducers/types';
import { signIn } from '../actions/auth';
import { getPatients } from '../actions/patient';
import { getQueue, addQueue } from '../actions/queue';
import { setAddDialogState } from '../actions/dialogState';
import { Redirect } from 'react-router-dom';

class QueuePage extends React.Component<any, any> {
  
  componentDidMount() {
    if (this.props.authStatus.isLoggedIn) {
      this.props.getQueue()
      this.props.getPatients()
    }
  }

  public render() {
    const { authStatus } = this.props

    if (!authStatus.isLoggedIn) {
      return <Redirect to="/login" />
    }
    return <Queue 
      drawer={this.props.drawer}
      dialogState={this.props.dialogState}
      queueList={this.props.queueList}
      patients={this.props.patients}
      setAddDialogState={this.props.setAddDialogState}
      addQueue={this.props.addQueue}/>
  }
}

function mapStateToProps(state: stateTypeObject) {
  console.log(state)
  return {
    authStatus: state.auth,
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
      setAddDialogState,
      signIn
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(QueuePage);