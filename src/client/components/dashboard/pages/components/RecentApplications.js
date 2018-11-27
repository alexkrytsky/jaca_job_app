import { List, Typography, withStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RootState from '../../../../store/RootState';
import ApplicationListing from './ApplicationListing';


@withStyles(theme => ({
  paper: {
    width: '100%',
    padding: theme.spacing.unit,
  },
}))
@inject('store')
@observer
class RecentApplications extends Component {
  componentWillMount() {
    const { store } = this.props;
    store.fetchApps();
  }

  render() {
    const { classes, store } = this.props;
    return (
      <div className={classes.paper}>
        <Typography variant="display1">Recent Applications</Typography>
        <Typography variant="subheading">Most Recent completed applications</Typography>
        <List dense>
          {store.session.apps
            .slice() // Create copy to make mobx happy
            .sort((a, b) => new Date(a.created) <= new Date(b.created) ? 1 : -1) // Sort by time
            .slice(0, 5) // Limit to five entries
            .map(value => (
              <ApplicationListing key={value.key.id} app={value} />
            ))}
        </List>
      </div>
    );
  }
}

RecentApplications.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired,
};

export default RecentApplications;
