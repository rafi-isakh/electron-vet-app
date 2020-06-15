import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import PersistentDrawerLeft from '../components/PersistentDrawerLeft';
import { setDrawer } from '../actions/drawer';
import { counterStateType } from '../reducers/types';

function mapStateToProps(state: counterStateType) {
  return {
    drawer: state.drawer
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setDrawer
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersistentDrawerLeft);
