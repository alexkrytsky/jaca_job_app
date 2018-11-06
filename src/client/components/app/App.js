import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import { CssBaseline, Paper, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Jobs from '../jobs/Jobs';
import Application from '../application/Application';
import CustomNavBar from '../common/CustomNavBar';
import FixedSidebar from '../common/FixedSidebar';
import Home from '../dashboard/pages/Home';
import Login from '../dashboard/Login';
import RootState from '../../store/RootState';
import ApplicationView from '../dashboard/pages/ApplicationView';

const bannerImageHeight = 200;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: window.innerHeight,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    marginTop: '64px',
    flexGrow: 1,
    padding: theme.spacing.unit,
  },
  bannerImage: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: `${bannerImageHeight}px`,
    zIndex: -1
  }
});

/**
 * Main Component, defines url based routes
 */
@inject('store')
@observer
class App extends Component {
  componentWillMount() {
    const { store } = this.props;
    const { getStatus } = store.authentication;
    getStatus();
  }

  render() {
    const { store, classes } = this.props;
    const { loggedIn } = store.session;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <CustomNavBar useDrawer={loggedIn} />
        {loggedIn && (
          <Fragment>
            <FixedSidebar />
            <Paper className={classes.bannerImage}>
              <img
                className={classes.bannerImage}
                src={`https://picsum.photos/${window.innerWidth}/${bannerImageHeight}?image=590&gravity=center`}
                alt=""
              />
            </Paper>

          </Fragment>
        )}
        <main className={classes.content}>
          {loggedIn ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/app" component={Application} />
              <Route path="/application/:appId" component={ApplicationView} />
              <Route path="/jobs" component={Jobs} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Login} />
              <Route component={Application} />
            </Switch>
          )}
        </main>
      </div>
    );
  }
}

App.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(App));
