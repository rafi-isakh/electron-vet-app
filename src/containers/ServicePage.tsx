import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch, stateTypeObject } from '../reducers/types';
import Service from '../components/service/Service';
import { getServices, addService, editService, deleteService } from '../actions/service';
import { setAddDialogState, setEditDialogState, setDeleteDialogState } from '../actions/dialogState';
import { setActiveProfile } from '../actions/activeProfile';

class ServicePage extends React.Component<any, any> {

  componentDidMount() {
    if (!this.props.auth.isEmpty) {
      this.props.getServices();
    }
  }

  public render() {
    return <Service
      activeProfile={this.props.activeProfile}
      auth={this.props.auth}
      drawer={this.props.drawer}
      dialogState={this.props.dialogState}
      services={this.props.services}
      addService={this.props.addService}
      editService={this.props.editService}
      deleteService={this.props.deleteService}
      setActiveProfile={this.props.setActiveProfile}
      setAddDialogState={this.props.setAddDialogState}
      setEditDialogState={this.props.setEditDialogState}
      setDeleteDialogState={this.props.setDeleteDialogState}/>
  }
}

function mapStateToProps(state: stateTypeObject) {
  console.log(state)
  return {
    activeProfile: state.activeProfile,
    auth: state.firebase.auth,
    drawer: state.drawer,
    dialogState: state.dialogState,
    services: state.services
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getServices,
      addService,
      editService,
      deleteService,
      setActiveProfile,
      setAddDialogState,
      setEditDialogState,
      setDeleteDialogState
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePage);