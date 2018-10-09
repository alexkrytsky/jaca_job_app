import React, { Component, Fragment } from 'react';
import { CssBaseline, Typography, ListItem, withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import RootState from '../../store/RootState';
import CustomNavBar from '../common/CustomNavBar';
import FixedSidebar from '../common/FixedSidebar';
import Login from './Login';

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
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

@inject('store')
@observer
class Dashboard extends Component {
  render() {
    const { store, classes } = this.props;
    const { authentication } = store;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <CustomNavBar useDrawer />
        <FixedSidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {
            authentication.loggedIn ? (
              <Typography noWrap variant="headline">Dashboard</Typography>
            ) : (
              <Login />
            )
          }
        </main>
      </div>
    );
  }
}

Dashboard.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired
};

export default withStyles(styles)(withRouter(Dashboard));
