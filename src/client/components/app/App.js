import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import RootState from '../../store/RootState';
import Jobs from '../jobs/Jobs';
import Application from '../application/Application';
import Dashboard from '../dashboard/Dashboard';

/**
 * Main Component, defines url based routes
 */
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

// Tell React that these properties are provided
App.wrappedComponent.propTypes = {
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withRouter(App);
