import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import PersistentDrawer from './containers/PersistentDrawer';
import PatientPage from './containers/PatientPage';
import MedicalRecord from './components/MedicalRecord';

export default function Routes() {
  return (
    <App>
      <PersistentDrawer />
      <Switch>
        <Route path={routes.PATIENT} component={PatientPage} />
        <Route path={routes.HOME} component={MedicalRecord} />
      </Switch>
    </App>
  );
}