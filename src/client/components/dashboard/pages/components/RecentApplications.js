import React, { Component } from 'react';
import { Card, CardContent, CardHeader, List, withStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import RootState from '../../../../store/RootState';
import ApplicationListing from './ApplicationListing';

const styles = theme => ({
  root: {},
});

@inject('store')
@observer
class RecentApplications extends Component {
  componentWillMount() {
    const { store } = this.props;
    store.fetchApps();
  }

  render() {
    const { store } = this.props;
    return (
      <Card>
        <CardHeader
          title="Recent Applications"
          subheader="Most Recent completed applications"
        />
        <CardContent>
          <List dense>
            {store.session.apps
              .slice() // Create copy to make mobx happy
              .sort((a, b) => new Date(a.created) <= new Date(b.created) ? 1 : -1) // Sort by time
              .slice(0, 5) // Limit to five entries
              .map(value => (
                <ApplicationListing key={value.key.id} app={value} />
              ))}
          </List>
        </CardContent>
      </Card>
    );
  }
}

RecentApplications.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({ store: PropTypes.instanceOf(RootState) }).isRequired,
};

export default withStyles(styles)(RecentApplications);
