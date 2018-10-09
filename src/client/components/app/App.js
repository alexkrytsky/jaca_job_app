import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import RootState from '../../store/RootState';
import Jobs from '../jobs/Jobs';
import Application from '../application/Application';
import Dashboard from '../dashboard/Dashboard';

// Component Creation
@inject('store')
@observer
class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route path="/app" component={Application} />
          <Route path="/jobs" component={Jobs} />
          <Route component={Dashboard} />
        </Switch>
      </Fragment>
    );
  }
}

// Properties to be passed in by Providers
App.wrappedComponent.propTypes = {
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withRouter(App);
