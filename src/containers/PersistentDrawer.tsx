import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import PersistentDrawerLeft from '../components/PersistentDrawerLeft';
import { setDrawer } from '../actions/drawer';
import { signOut, signIn } from '../actions/auth';
import { stateTypeObject } from '../reducers/types';

class PersistentDrawer extends React.Component<any, any> {

  public render() {
    const { auth } = this.props
    if(auth.uid) {
      return <PersistentDrawerLeft
        auth={auth} 
        drawer={this.props.drawer}
        user={this.props.user}
        setDrawer={this.props.setDrawer}
        signOut={this.props.signOut}
        children={this.props.children}/>
    }
    return null;
  }
}

function mapStateToProps(state: stateTypeObject) {
  return {
    auth: state.firebase.auth,
    drawer: state.drawer,
    user: state.loginInfo
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setDrawer,
      signIn,
      signOut
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PersistentDrawer);
