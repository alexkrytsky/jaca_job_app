import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import Jobs from '../jobs/Jobs';
import Application from '../application/Application';
import Dashboard from '../dashboard/Dashboard';

/**
 * Main Component, defines url based routes
 */
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

export default withRouter(App);
