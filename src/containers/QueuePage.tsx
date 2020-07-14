import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Queue from '../components/Queue';
import { stateTypeObject, Dispatch } from '../reducers/types';
import { getQueue } from '../actions/queue';

class QueuePage extends React.Component<any, any> {
  
  componentDidMount() {
    this.props.getQueue()
  }

  public render() {
    return <Queue 
      drawer={this.props.drawer}
      queueList={this.props.queueList}/>
  }
}

function mapStateToProps(state: stateTypeObject) {
  console.log(state)
  return {
    drawer: state.drawer,
    queueList: state.queue
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getQueue,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(QueuePage);