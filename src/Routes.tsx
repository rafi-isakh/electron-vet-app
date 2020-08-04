import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import PersistentDrawer from './containers/PersistentDrawer';
import PatientPage from './containers/PatientPage';
import QueuePage from './containers/QueuePage';
import SignInPage from './containers/SignInPage';
import MedicalRecordPage from './containers/MedicalRecordPage';

export default function Routes() {
  return (
      <App>
      <PersistentDrawer />
        <Switch>
          <Route path={routes.LOGIN} component={SignInPage} />
          <Route path={routes.PATIENT} component={PatientPage} />
          <Route path={routes.MEDREC} component={MedicalRecordPage} />
          <Route path={routes.HOME} component={QueuePage} />
        </Switch>
      </App>
  );
}