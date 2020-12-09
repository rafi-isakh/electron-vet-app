import React from 'react';
import SignIn from '../components/SignIn';
import { Dispatch, stateTypeObject } from '../reducers/types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signIn, setCredential } from '../actions/auth';
import { getUserInfo } from '../actions/userInfo';

class SignInPage extends React.Component<any, any> {

  componentDidMount() {
    if (this.props.auth.uid) {
      this.props.getUserInfo()
    }
  }

  public render() {
    const { authStatus } = this.props
    if(!authStatus.isLoggedIn) {
      return <SignIn signIn={this.props.signIn}/>
    }
    return null
  }
}

function mapStateToProps(state: stateTypeObject) {
    console.log(state)
    return {
      auth: state.firebase.auth,
      authStatus: state.auth
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      signIn,
      setCredential,
      getUserInfo
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);